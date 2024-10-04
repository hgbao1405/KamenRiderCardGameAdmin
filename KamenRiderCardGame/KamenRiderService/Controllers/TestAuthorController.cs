using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KamenRiderCardGame.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class TestAuthorController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public string Post()
        {
            return "Hello admin";
        }

        [HttpGet]
        [Authorize(Roles = "Admin2")]
        public string Get2()
        {
            return "Hello admin2";
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public string Get3()
        {
            return "Hello User";
        }
    }
}
