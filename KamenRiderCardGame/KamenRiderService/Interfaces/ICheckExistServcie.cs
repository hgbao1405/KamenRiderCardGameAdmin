using SharedResource.Models;

namespace KamenRiderCardGame.Interfaces
{
    public interface ICheckExistServcie
    {
        Task<(Character character, Form formExist)> GetCharacterAndFormAsync(int characterId, string formName);
    }
}