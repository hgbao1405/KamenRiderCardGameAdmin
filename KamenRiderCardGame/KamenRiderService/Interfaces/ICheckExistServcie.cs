using SharedResource.Models;

namespace KamenRiderCardGame.Interfaces
{
    public interface ICheckExistServcie
    {
        Task<List<Form>> CheckExistFormByCharacterId(int id);
        Task<Character> CheckExistCharacterAsync(int characterId);
        Task<Form> CheckExistFormAsync(int characterId, string formName);
    }
}