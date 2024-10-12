using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamenRiderCardGame.Data;
using SharedResource.Models;

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KamenRiderTypesController : ControllerBase
    {
        private readonly KamenRiderCardGameContext _context;

        public KamenRiderTypesController(KamenRiderCardGameContext context)
        {
            _context = context;
        }

        // GET: api/KamenRiderTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KamenRiderType>>> GetKamenRiderTypes()
        {
            return await _context.KamenRiderTypes.ToListAsync();
        }

        // GET: api/KamenRiderTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KamenRiderType>> GetKamenRiderType(int id)
        {
            var kamenRiderType = await _context.KamenRiderTypes.FindAsync(id);

            if (kamenRiderType == null)
            {
                return NotFound();
            }

            return kamenRiderType;
        }

        private bool KamenRiderTypeExists(int id)
        {
            return _context.KamenRiderTypes.Any(e => e.Id == id);
        }
    }
}
