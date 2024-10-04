using Authenticate.Models;
using Authenticate.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Packaging;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authenticate.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public readonly IUserService _userService;
        public readonly string secretKey;

        public AccountController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            secretKey = "thisIsAnotherLongerSecretKeyThatIsMoreSecureAndHas64Characters!";
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginModel login)
        {
            // Xác thực người dùng từ database
            var user = _userService.Authenticate(login.Username, login.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user.Username);
            return Ok(new { Token = token });
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
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
