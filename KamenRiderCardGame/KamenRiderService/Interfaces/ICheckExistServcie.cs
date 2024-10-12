using SharedResource.Models;

namespace KamenRiderCardGame.Interfaces
{
    public interface ICheckExistServcie
    {
        Task<Character> CheckExistCharacterAsync(int characterId);
        Task<Form> CheckExistFormAsync(int characterId, string formName);
    }
}