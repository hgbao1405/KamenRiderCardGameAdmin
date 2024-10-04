using KamenRiderCardGame.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedResource.Middleware;
using SharedResource.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormTypesController : ControllerBase
    {
        private KamenRiderCardGameContext _context;
        private ILogger<LoggingMiddleware> _logger;

        public FormTypesController(KamenRiderCardGameContext context,
            ILogger<LoggingMiddleware> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/<FormTypesController>
        [HttpGet("[action]")]
        public IEnumerable<object> GetAll()
        {
            _logger.LogInformation("Get all form types");
            return _context.TypeForm.Include(x=>x.KamenRiderType)
                .GroupBy(x => x.KamenRiderType.Name).Select(x =>
                new {
                    KamenRiderType = x.Key,
                    FormTypes = x.Select(y => new { Id = y.Id,
                        Name = y.Name, 
                        Description = y.Description 
                    }).ToList(),
                }
                ).ToList();
        }

        // GET api/<FormTypesController>/GetListTypeFormByKamenRiderTypeId/5
        [HttpGet("[action]/{id}")]
        public IEnumerable<TypeForm> GetListTypeFormByKamenRiderTypeId(int id)
        {
            _logger.LogInformation("Get list type form by KamenRiderTypeId:{id}", id);
            return _context.TypeForm.Where(x => x.IdKamenRiderType == id).ToList();
        }
    }
}
