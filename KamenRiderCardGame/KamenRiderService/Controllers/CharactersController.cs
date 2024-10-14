using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamenRiderCardGame.Data;
using GenericFileService.Files;
using SharedResource.Middleware;
using SharedResource.Models;
using KamenRiderCardGame.Interfaces;

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharactersController : ControllerBase
    {
        private readonly KamenRiderCardGameContext _context;
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly ICheckExistServcie _checkExistServcie;

        public CharactersController(KamenRiderCardGameContext context, ILogger<LoggingMiddleware> logger, 
            ICheckExistServcie checkExistServcie)
        {
            _context = context;
            _logger = logger;
            _checkExistServcie = checkExistServcie;
        }

        // GET: api/Characters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Character>>> GetCharacter()
        {
            _logger.LogInformation("Get all characters");
            return await _context.Character.Where(x => x.Deleted == false).Select(x=>
            new Character{
                Id=x.Id,Name=x.Name,Description=x.Description,Avatar=x.Avatar,
                Attack=x.Attack,Health=x.Health,KamenRiderType=x.KamenRiderType,
                KamenRiderTypeId=x.KamenRiderTypeId,Speed=x.Speed
            }).ToListAsync();
        }

        // GET: api/Characters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Character>> GetCharacter(int id)
        {
            _logger.LogInformation("Get one character with id:{charId}", id);
            var character = await _context.Character.FindAsync(id);

            if (character == null || character.Deleted == true)
            {
                _logger.LogInformation("Character with id:{charId} not found", id);
                return NotFound();
            }

            return character;
        }

        // PUT: api/Characters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharacter(int id, [FromBody] Character character)
        {
            try
            {
                Character characterExist=new Character();
                if (!CharacterExists(id, out characterExist) || character.Id!=id)
                {
                    _logger.LogWarning("Character with id:{charId} not found", id);
                    return NotFound("Character with id:" + id + " not found");
                }
                //Kiem tra xem character type co ton tai khong
                var characterType = await _context.KamenRiderTypes.FirstOrDefaultAsync(x => x.Id == character.KamenRiderTypeId);
                if (characterType == null)
                {
                    _logger.LogWarning("Character Type is not found");
                    return BadRequest("Character Type is not found");
                }
                //Không thể thay đổi loại nếu danh sách form đang tồn tại
                if (characterExist.KamenRiderTypeId != character.KamenRiderTypeId)
                {
                    var Forms=await _checkExistServcie.CheckExistFormByCharacterId(character.Id);

                    if (Forms.Count > 0)
                    {
                        _logger.LogWarning("This character has forms can't change character type");
                        return BadRequest("This character has forms can't change character type");
                    }
                    characterExist.KamenRiderTypeId = character.KamenRiderTypeId;
                }

                characterExist.Description = character.Description;
                characterExist.Name = character.Name;
                characterExist.Attack = character.Attack;
                characterExist.Jump = character.Jump;
                characterExist.Kick = character.Kick;
                characterExist.Health = character.Health;
                characterExist.Speed = character.Speed;

                if (character.CardAttrBasic != null)
                {
                    characterExist.CardAttrBasic = character.CardAttrBasic;
                }

                characterExist.Update();

                _logger.LogInformation("Update character with id:{charId}", id);
                _context.Entry(characterExist).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Update character with id:{charId} success", id);
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CharacterExists(id, out Character characterExist))
                {
                    _logger.LogWarning("Character with id:{charId} not found", id);
                    return NotFound();
                }
                else
                {
                    _logger.LogWarning("Update character with id:{charId} failed", id);
                }
            }

            return NoContent();
        }

        // POST: api/Characters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Character>> PostCharacter([FromBody] Character character)
        {
            try
            {
                _logger.LogInformation("Create character with id:{charId}", character.Id);
                character.Create();
                var CardAttrBasic=new CardAttrHtml();
                _logger.LogInformation("Create card Layout for character with id:{charId}", character.Id);
                character.CardAttrBasic=CardAttrBasic.BasicAttr();
                _context.Character.Add(character);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCharacter", new { id = character.Id }, character);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Create character failed");
            }

            return BadRequest();
        }

        // DELETE: api/Characters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCharacter(int id)
        {
            try
            {
                _logger.LogInformation("Delete character with id:{charId}", id);
                var character = await _context.Character.FindAsync(id);
                if (character == null || character.Deleted == true)
                {
                    _logger.LogWarning("Character with id:{charId} not found", id);
                    return NotFound();
                }

                character.Delete();
                //_context.Character.Remove(character);
                _context.Entry(character).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                _logger.LogInformation("Delete character with id:{charId} success", id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Delete character failed");
                return BadRequest();
            }
        }

        private bool CharacterExists(int id, out Character character)
        {
            character = _context.Character.FirstOrDefault(x => x.Id == id);
            return character != null && character.Deleted == false;
        }

        [HttpPut("UpdateImage")]
        public async Task<ActionResult<Character>> UpdateImage([FromForm] UpdateImageRequest request)
        {
            _logger.LogInformation("Update image of character with id:{charId}", request.Id);
            if (request.File == null || request.File.Length == 0)
            {
                _logger.LogWarning("Can't update image of character with id:{charId} because file is null", request.Id);
                return NotFound();
            }
            if (request.Id == 0)
            {
                _logger.LogWarning("Can't update image of character with id:{charId} because id is 0", request.Id);
                return NotFound();
            }
            var character = await _context.Character.FindAsync(request.Id);

            if (character == null || character.Deleted == true)
            {
                _logger.LogWarning("Character with id:{charId} not found", request.Id);
                return NotFound();
            }
            character.Avatar = "images/"+FileService.FileSaveToServer(request.File, "wwwroot/images/");
            character.Update();
            _context.Entry(character).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
                _logger.LogInformation("Update image of character with id:{charId} success", request.Id);
                return Ok(character);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Update image of character failed");
                return BadRequest();
            }
        }
    }

    public class UpdateImageRequest
    {
        public int Id { get; set; }
        public IFormFile File { get; set; }
    }
}
