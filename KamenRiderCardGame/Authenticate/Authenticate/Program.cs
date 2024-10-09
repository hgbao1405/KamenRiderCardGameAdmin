using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Authenticate.Data;
using Authenticate.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Authenticate.Interfaces;

namespace Authenticate
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var secretKey = "thisIsAnotherLongerSecretKeyThatIsMoreSecureAndHas64Characters!";

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "HoGiaBao",
                    ValidAudience = "Bao's Audience",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)) // Đặt secret key mạnh mẽ.
                };
            });

            builder.Services.AddAuthorization();

            builder.Services.AddDbContext<AuthenticateContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("AuthenticateContext") ?? throw new InvalidOperationException("Connection string 'AuthenticateContext' not found.")));

            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IUserService,UserService>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:3000")
                                            .AllowAnyHeader() // Hoặc cụ thể .WithHeaders("Content-Type")
                                            .AllowAnyMethod(); // Cho phép mọi phương thức như GET, POST, PUT, DELETE
                                  });
            });
            var app = builder.Build();

            app.UseMiddleware<SharedResource.Middleware.LoggingMiddleware>();

            app.UseCors(MyAllowSpecificOrigins);
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
