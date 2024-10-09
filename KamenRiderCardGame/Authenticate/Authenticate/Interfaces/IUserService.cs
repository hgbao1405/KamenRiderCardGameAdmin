using Authenticate.Models;

namespace Authenticate.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        ICollection<Role> GetRoles(string username);
        bool IsEixst(string username);
        string Regrister(string username, string password);
    }
}