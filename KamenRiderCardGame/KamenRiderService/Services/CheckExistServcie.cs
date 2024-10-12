using KamenRiderCardGame.Data;
using KamenRiderCardGame.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using SharedResource.Models;
using System.Threading;

namespace KamenRiderCardGame.Services
{
    public class CheckExistServcie : ICheckExistServcie
    {
        private readonly DbContextOptions<KamenRiderCardGameContext> _options;

        public CheckExistServcie(DbContextOptions<KamenRiderCardGameContext> options)
        {
            _options = options;
        }

        public async Task<(Character character, Form formExist)> GetCharacterAndFormAsync(int characterId, string formName)
        {
            var characterTask = Task.Run(() =>
            {
                using (var context = new KamenRiderCardGameContext(_options))
                {
                    return context.Character.FirstOrDefaultAsync(x => x.Id == characterId && x.Deleted == false).Result;
                }
            });

            var formExistTask = Task.Run(() =>
            {
                using (var context = new KamenRiderCardGameContext(_options))
                {
                    return context.Form.FirstOrDefaultAsync(x => x.IdCharacter == characterId && x.Name == formName).Result;
                }
            });

            await Task.WhenAll(characterTask, formExistTask);

            return (await characterTask, await formExistTask);
        }
    }
}
