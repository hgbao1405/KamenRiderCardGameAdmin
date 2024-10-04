using Authenticate.Data;
using Authenticate.Models;
using Microsoft.EntityFrameworkCore;

namespace Authenticate.Services
{
    public class UserService : IUserService
    {
        private readonly AuthenticateContext _context;

        public UserService(AuthenticateContext context)
        {
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            // Tìm người dùng theo tên đăng nhập và mật khẩu
            return _context.Users.SingleOrDefault(u => u.Username == username && u.Password == password);
        }

        public ICollection<Role> GetRoles(string username) {
            var roles = _context.UserRoles.Include(x => x.User).Include(x => x.Role).Where(u => u.User.Username == username).ToList();
            return roles.Select(x => x.Role).ToList();
        }
    }
}
