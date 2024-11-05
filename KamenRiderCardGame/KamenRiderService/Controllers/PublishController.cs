using KamenRiderCardGame.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SharedResource.Middleware;
using SharedResource.Models;

namespace KamenRiderCardGame.Controllers
{
    public class PublishController<T>: ControllerBase where T : PublishObject
    {
        private readonly KamenRiderCardGameContext _context;
        private readonly ILogger<LoggingMiddleware> _logger;

        public PublishController(KamenRiderCardGameContext context, ILogger<LoggingMiddleware> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]/{id}")]
        public async Task<ActionResult<T>> GetPublishObject(int id)
        {
            var obj = await _context.Set<T>().FindAsync(id);

            if (obj!=null && obj.IsPubish)
            {
                return obj;
            }

            return NotFound();
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<T>>> GetPublishObjects()
        {
            return await _context.Set<T>().Where(x => x.IsPubish).ToListAsync();
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> PublishById(int id)
        {
            var obj = _context.Set<T>().Find(id);

            if (obj == null)
            {
                return NotFound();
            }
            
            obj.Publish();
            Update(obj);

            return Ok();
        }

        [HttpPut("[action]")]
        public async Task<ActionResult> UnPublishById(int id)
        {
            var obj = _context.Set<T>().Find(id);

            if (obj == null)
            {
                return NotFound();
            }

            obj.UnPublish();
            Update(obj);

            return Ok();
        }

        private void Update(T obj)
        {
            switch (typeof(T).Name)
            {
                case "Character":
                    var c = obj as Character;
                    c.Update();
                    break;
                case "Form":
                    var f = obj as Form;
                    f.Update();
                    break;
            }

            _context.Entry(obj).State = EntityState.Modified;
        }
    }
}