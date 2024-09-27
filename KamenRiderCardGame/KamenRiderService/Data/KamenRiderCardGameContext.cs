using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Humanizer;
using SharedResource;
using System.Numerics;

namespace KamenRiderCardGame.Data
{
    public class KamenRiderCardGameContext : DbContext
    {
        public KamenRiderCardGameContext (DbContextOptions<KamenRiderCardGameContext> options)
            : base(options)
        {
        }

        public DbSet<Character> Character { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Character>().HasData(
                new Character { Id = 1,
                    Name = "OOO",
                    Health = 100, Attack = 10,
                    Avatar = "images/OOO.png",
                    Kick = 10,
                    Speed = 10,
                    Description="OOO"
                },
                new Character
                {
                    Id = 2,
                    Name = "Ex-Aid",
                    Health = 100,
                    Attack = 10,
                    Kick = 10,
                    Speed = 10,
                    Avatar = "images/Ex-Aid.png",
                    Description="Ex-Aid"
                },
                new Character
                {
                    Id = 3,
                    Name = "Gavv",
                    Health = 100,
                    Attack = 10,
                    Kick = 10,
                    Speed = 10,
                    Avatar = "images/Gavv.png",
                    Description="Gavv"
                }
            );
        }
    }
}
