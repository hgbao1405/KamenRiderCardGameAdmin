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

        public Task<List<Form>> CheckExistFormByCharacterId(int id)
        {
            using (var context = new KamenRiderCardGameContext(_options))
            {
                return context.Form.Where(x => x.IdCharacter == id && x.Deleted == false).ToListAsync();
            }
        }

        public async Task<Character> CheckExistCharacterAsync(int characterId)
        {
            using (var context = new KamenRiderCardGameContext(_options))
            {
                return await context.Character.FirstOrDefaultAsync(x => x.Id == characterId && x.Deleted == false);
            }
        }
        public async Task<Form> CheckExistFormAsync(int characterId, string formName)
        {
            using (var context = new KamenRiderCardGameContext(_options))
            {
                return await context.Form.FirstOrDefaultAsync(x => x.IdCharacter == characterId && x.Name == formName && x.Deleted == false);
            }
        }
    }
}
