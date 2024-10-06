using Authenticate.Models;
using Authenticate.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.IdentityModel.Tokens;
using NuGet.Packaging;
using SharedResource.Middleware;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authenticate.Controllers
{
    [Route("api/[controller]/[action]")]
    //[ApiController]
    public class AccountController : ControllerBase
    {
        public readonly IUserService _userService;
        private readonly string secretKey;
        private readonly ILogger<LoggingMiddleware> _logger;
        
        public AccountController(IUserService userService, IConfiguration configuration,
            ILogger<LoggingMiddleware> logger)
        {
            _userService = userService;
            secretKey = "thisIsAnotherLongerSecretKeyThatIsMoreSecureAndHas64Characters!";
            _logger = logger;
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            _logger.LogInformation("Login: {0}", login.Username);
            // Xác thực người dùng từ database
            var user = _userService.Authenticate(login.Username, login.Password);
            if (user == null)
            {
                _logger.LogWarning("Login: {0} failed", login.Username);
                return Unauthorized(new string[] { "Username or password is incorrect" });
            }
            _logger.LogInformation("Login: Generate token for {0}", login.Username);
            var token = GenerateJwtToken(user.Username);
            _logger.LogInformation("Login: {0} success", login.Username);
            return Ok(new { Token = token });
        }
        [HttpPost]
        public IActionResult Regrister([FromBody] RegristerModel regrister)
        {
            _logger.LogInformation("Regrister: {0}", regrister.Username);
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Regrister: {0} failed: Invalid model", regrister.Username);
                return BadRequest(ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToArray());
            }
            if (_userService.IsEixst(regrister.Username))
            {
                _logger.LogWarning("Regrister: {0} failed: Username already exists", regrister.Username);
                return BadRequest(new string[] {"Username already exists"});
            }
            string res = _userService.Regrister(regrister.Username, regrister.Password);
            
            if(res == "Success")
            {
                _logger.LogInformation("Regrister: {0} success", regrister.Username);
                return Ok(new string[] { res });
            }
            else
            {
                _logger.LogWarning("Regrister: {0} failed: {1}", regrister.Username, res);
                return BadRequest(new string[] { res });
            }
        }
        private string GenerateJwtToken(string username)
        {
            // Khóa bí mật để ký JWT
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var roles = _userService.GetRoles(username); // Lấy nroles
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role.Name)));
            // Tạo token
            var token = new JwtSecurityToken(
                issuer: "HoGiaBao",
                audience: "Bao's Audience",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Token hết hạn sau 30 phút
                signingCredentials: credentials);

            // Trả về token dưới dạng chuỗi
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetInfo()
            {
            var claims = User.Claims;

            var usernameClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var roles = claims
                .Where(c => c.Type == ClaimTypes.Role) 
                .Select(c => c.Value) 
                .ToList();

            var userInfo = new
            {
                Username = usernameClaim,
                Roles = roles
            };

            return Ok(userInfo);
        }
    }

    public class RegristerModel
    {
        [Required(ErrorMessage = "Username is required")]
        [MaxLength(20, ErrorMessage = "Username must not exceed 20 characters")]
        [MinLength(8, ErrorMessage = "Username must have at least 8 characters")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [MaxLength(20, ErrorMessage = "Password must not exceed 20 characters")]
        [MinLength(8, ErrorMessage = "Password must have at least 8 characters")]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
