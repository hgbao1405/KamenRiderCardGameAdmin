using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Authenticate.Models;

namespace Authenticate.Data
{
    public class AuthenticateContext : DbContext
    {
        public AuthenticateContext (DbContextOptions<AuthenticateContext> options)
            : base(options)
        {
        }

        public DbSet<Authenticate.Models.User> Users { get; set; } = default!;
        public DbSet<Authenticate.Models.Role> Roles { get; set; } = default!;
        public DbSet<Authenticate.Models.UserRole> UserRoles { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Authenticate.Models.Role>().HasData(
                new Authenticate.Models.Role
                {
                    Id = 1,
                    Name = "Admin"
                },
                new Authenticate.Models.Role
                {
                    Id = 2,
                    Name = "User"
                }
            );

            modelBuilder.Entity<Authenticate.Models.User>().HasData(
                new Authenticate.Models.User
                {
                    Id = 1,
                    Username = "admin",
                    Password = "admin",
                }
            );

            modelBuilder.Entity<Authenticate.Models.UserRole>().HasData(
                new Authenticate.Models.UserRole
                {
                    Id = 1,
                    UserId = 1,
                    RoleId = 1
                },
                new Authenticate.Models.UserRole
                {
                    Id = 2,
                    UserId = 1,
                    RoleId = 2
                }
            );

        }
    }
}
