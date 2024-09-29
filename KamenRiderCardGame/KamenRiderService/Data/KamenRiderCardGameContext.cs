using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Humanizer;
using SharedResource;
using System.Numerics;
using SharedResource.Models;

namespace KamenRiderCardGame.Data
{
    public class KamenRiderCardGameContext : DbContext
    {
        public KamenRiderCardGameContext (DbContextOptions<KamenRiderCardGameContext> options)
            : base(options)
        {
        }

        public DbSet<Character> Character { get; set; } = default!;
        public DbSet<KamenRiderType> KamenRiderTypes { get; set; } = default!;

        public DbSet<SharedResource.Models.Form> Form { get; set; } = default!;
        public DbSet<SharedResource.Models.TypeForm> TypeForm { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<KamenRiderType>().HasData(
                new KamenRiderType
                {
                    Id = 1,
                    Name = "Normal Kamen Rider",
                    Description = "Normal Kamen Rider is Kamen Rider," +
                    " who has no or one item to change form.",
                },
                new KamenRiderType
                {
                    Id = 2,
                    Name = "MultiComponent Kamen Rider",
                    Description = "MultiComponent Kamen Rider is Kamen Rider," +
                    " who has more than one item to change form.",
                }
                );
            builder.Entity<SharedResource.Models.TypeForm>().HasData(
                new TypeForm
                {
                    Id = 1,
                    IdKamenRiderType = 1,
                    Name = "Component",
                    Description = "this form is a part of the multiple form"
                },
                new TypeForm
                {
                    Id = 2,
                    IdKamenRiderType = 1,
                    Name = "Multiple",
                    Description = "this form have many components form"
                },
                new TypeForm
                {
                    Id = 3,
                    IdKamenRiderType = 2,
                    Name = "Base",
                    Description = "this is a base form of a Kamen Rider"
                },
                new TypeForm
                {
                    Id = 4,
                    IdKamenRiderType = 2,
                    Name = "Speed",
                    Description = "this is a form has high speed of a Kamen Rider"
                },
                new TypeForm
                {
                    Id = 5,
                    IdKamenRiderType = 2,
                    Name = "Sword",
                    Description = "Kamen Rider use this form can summon a sword and add " +
                    "damage attack"
                },
                new TypeForm
                {
                    Id = 6,
                    IdKamenRiderType = 2,
                    Name = "Shield",
                    Description = "Kamen Rider use this form can summon a shield and" +
                    " add Form's Hp",
                },
                new TypeForm
                {
                    Id = 7,
                    IdKamenRiderType = 2,
                    Name = "Slash",
                    Description = "Kamen Rider use this form can summon a gun" +
                    " and add damage attack, allow attack opponent, who is flying"
                },
                new TypeForm
                {
                    Id = 8,
                    IdKamenRiderType = 2,
                    Name = "Wing",
                    Description = "Kamen Rider use this form will have flying status",
                },
                new TypeForm
                {
                    Id = 9,
                    IdKamenRiderType = 2,
                    Name = "Shaft",
                    Description = "Kamen Rider use this form will summon a shaft weapon" +
                    " and add damage attack",
                }
                );
            
            builder.Entity<Character>().HasData(
                new Character { Id = 1,
                    Name = "OOO",
                    Health = 100, Attack = 10,
                    Avatar = "images/OOO.png",
                    Kick = 10,
                    Speed = 10,
                    Jump=10,
                    Description="OOO",
                    KamenRiderTypeId=1
                },
                new Character
                {
                    Id = 2,
                    Name = "Ex-Aid",
                    Health = 100,
                    Attack = 10,
                    Kick = 10,
                    Speed = 10,
                    Jump=10,
                    Avatar = "images/Ex-Aid.png",
                    Description="Ex-Aid",
                    KamenRiderTypeId=1
                },
                new Character
                {
                    Id = 3,
                    Name = "Gavv",
                    Health = 100,
                    Attack = 10,
                    Kick = 10,
                    Speed = 10,
                    Jump=10,
                    Avatar = "images/Gavv.png",
                    Description="Gavv",
                    KamenRiderTypeId=1
                }
            );
        }
    }
}
