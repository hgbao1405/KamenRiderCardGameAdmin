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

        //// PUT: api/KamenRiderTypes/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutKamenRiderType(int id, KamenRiderType kamenRiderType)
        //{
        //    if (id != kamenRiderType.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(kamenRiderType).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!KamenRiderTypeExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/KamenRiderTypes
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<KamenRiderType>> PostKamenRiderType(KamenRiderType kamenRiderType)
        //{
        //    _context.KamenRiderTypes.Add(kamenRiderType);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetKamenRiderType", new { id = kamenRiderType.Id }, kamenRiderType);
        //}

        //// DELETE: api/KamenRiderTypes/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteKamenRiderType(int id)
        //{
        //    var kamenRiderType = await _context.KamenRiderTypes.FindAsync(id);
        //    if (kamenRiderType == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.KamenRiderTypes.Remove(kamenRiderType);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool KamenRiderTypeExists(int id)
        {
            return _context.KamenRiderTypes.Any(e => e.Id == id);
        }
    }
}
