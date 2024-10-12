using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamenRiderCardGame.Data;
using SharedResource.Models;
using GenericFileService.Files;
using SharedResource.Middleware;
using Microsoft.AspNetCore.Authorization;
using KamenRiderCardGame.Interfaces;

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormsController : ControllerBase
    {
        private readonly KamenRiderCardGameContext _context;
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly ICheckExistServcie _checkExistServcie;

        public FormsController(KamenRiderCardGameContext context,
            ILogger<LoggingMiddleware> logger,
            ICheckExistServcie checkExistServcie)
        {
            _context = context;
            _logger = logger;
            _checkExistServcie = checkExistServcie;
        }

        // GET: api/Forms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Form>>> GetForm()
        {
            _logger.LogInformation("Get all forms");
            return await _context.Form.ToListAsync();
        }

        // GET: api/Forms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Form>> GetForm(int id)
        {
            _logger.LogInformation("Get form with id:{charId}", id);
            var form = await _context.Form.FindAsync(id);

            if (form == null)
            {
                _logger.LogWarning("Form with id:{charId} not found", id);
                return NotFound();
            }

            _logger.LogInformation("Get form with id:{charId} success", id);
            return form;
        }

        // PUT: api/Forms/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutForm(int id, Form form)
        {
            _logger.LogInformation("Update form with id:{charId}", form.Id);

            if (!FormExists(id))
            {
                _logger.LogWarning("Form with id:{charId} not found", form.Id);
                return NotFound();
            }

            form.Update();
            _context.Entry(form).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation("Update form with id:{charId} success", form.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Update form with id:{charId} failed", form.Id);
            }

            return NoContent();
        }

        // POST: api/Forms
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Form>> PostForm(Form form)
        {
            _logger.LogInformation("Create form with name:{charName}", form.Name);

            var (character, formExist) = await _checkExistServcie.GetCharacterAndFormAsync(form.IdCharacter, form.Name);

            // Kiểm tra nếu một trong hai task trả về null
            if (character == null)
            {
                throw new Exception("Character not found");
            }

            if (formExist != null)
            {
                return BadRequest("Form with this name " + form.Name + " is already exists");
            }

            try
            {
                form.Create();
                _context.Form.Add(form);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Create form failed");
                return BadRequest();
            }

            return CreatedAtAction("GetForm", new { id = form.Id }, form);
        }

        // DELETE: api/Forms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            _logger.LogInformation("Delete form with id:{charId}", id);
            var form = await _context.Form.FindAsync(id);
            if (form == null)
            {
                _logger.LogWarning("Form with id:{charId} not found", id);
                return NotFound();
            }
            form.Delete();
            //_context.Character.Remove(character);
            _context.Entry(form).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Delete form with id:{charId} success", id);
            return NoContent();
        }

        [HttpPut("UpdateImage")]
        public async Task<ActionResult<Form>> UpdateImage([FromForm] UpdateImageRequest request)
        {
            _logger.LogInformation("Update image of character with id:{charId}", request.Id);

            if (request.Id == 0)
            {
                _logger.LogWarning("Can't update image of form because id is 0");
                return NotFound();
            }

            if (request.File == null || request.File.Length == 0)
            {
                _logger.LogWarning("Can't update image of character with id:{charId} because file is null", request.Id);
                return NotFound();
            }
            var Form = await _context.Form.FindAsync(request.Id);

            if (Form == null || Form.Deleted == true)
            {
                _logger.LogWarning("Form with id:{charId} not found", request.Id);
                return NotFound();
            }
            Form.Avatar = "images/" + FileService.FileSaveToServer(request.File, "wwwroot/images/");
            Form.Update();
            _context.Entry(Form).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
                _logger.LogInformation("Update image of character with id:{charId} success", request.Id);
                return Ok(Form);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Update image of character failed");
                return BadRequest();
            }
        }
        private bool FormExists(int id)
        {
            return _context.Form.Any(e => e.Id == id);
        }
    }
}
