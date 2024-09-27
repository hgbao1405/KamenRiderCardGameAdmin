using SharedResource.Models;

namespace SharedResource.Interface
{
    public interface IKamenRiderService
    {
        Task<Character> GetKamenRider(int id);
        Task<string> GetKamenRiderName(int id);
    }
}