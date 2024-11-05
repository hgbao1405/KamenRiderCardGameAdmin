using KamenRiderCardGame.Data;
using KamenRiderCardGame.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedResource.Middleware;
using SharedResource.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardLayoutController: ControllerBase
    {
        private readonly KamenRiderCardGameContext _context;
        private readonly ILogger<LoggingMiddleware> _logger;
        private readonly ICheckExistServcie _checkExistServcie;

        public CardLayoutController(KamenRiderCardGameContext context, ILogger<LoggingMiddleware> logger, ICheckExistServcie checkExistServcie)
        {
            _context = context;
            _logger = logger;
            _checkExistServcie = checkExistServcie;
        }

        // GET: api/CardCreator
        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<CardAttrHtml>> GetCardLayout(int id)
        {
            Character character = await _checkExistServcie.CheckExistCharacterAsync(id);

            if (character == null)
            {
                _logger.LogWarning("Character with id:{charId} not found", id);
                return NotFound();
            }

            //Nếu chưa có layout thì tạo layout mới
            if(character.CardAttrBasic == null) {
                character.CardAttrBasic = new CardAttrHtml().BasicAttr();

                _context.Entry(character).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Update character failed");
                    return NotFound();
                }
            }
            return Ok(character.CardAttrBasic);
        }
    }
}
