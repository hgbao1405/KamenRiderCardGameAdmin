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

        public bool IsEixst(string username)
        {
            return _context.Users.FirstOrDefault(x=>x.Username == username) != null;
        }

        public string Regrister(string username, string password)
        {
            try
            {
                _context.Users.Add(new User
                {
                    Username = username,
                    Password = password
                });
                _context.SaveChanges(); 
                _context.UserRoles.Add(new UserRole
                {
                    UserId = _context.Users.FirstOrDefault(x => x.Username == username).Id,
                    RoleId = 2
                });
                _context.SaveChanges();
                return "Success";
            }
            catch (Exception ex){
                return ex.Message;
            }
        }
    }
}
