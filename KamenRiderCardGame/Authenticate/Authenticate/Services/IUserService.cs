using Authenticate.Models;

namespace Authenticate.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        ICollection<Role> GetRoles(string username);
    }
}