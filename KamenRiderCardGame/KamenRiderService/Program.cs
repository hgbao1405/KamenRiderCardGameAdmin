using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using KamenRiderCardGame.Data;
using SharedResource.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace KamenRiderCardGame
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            var secretKey = "thisIsAnotherLongerSecretKeyThatIsMoreSecureAndHas64Characters!";

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<KamenRiderCardGameContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("KamenRiderCardGameContext") ?? throw new InvalidOperationException("Connection string 'KamenRiderCardGameContext' not found.")));
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
                options.Events = new JwtBearerEvents
                {
                    OnChallenge = async context =>
                    {
                        // Tùy chỉnh phản hồi khi token không hợp lệ hoặc thiếu token
                        context.HandleResponse();
                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync("{\"error\": \"Unauthorized access - token is invalid or missing.\"}");
                    },
                    OnForbidden = async context =>
                    {
                        context.Response.StatusCode = 403;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync("{\"error\": \"Forbidden - you do not have permission.\"}");
                    }
                };
            });
            // Add services to the container.
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSignalR();
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
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                //app.UseSpa(spa =>
                //{
                //    spa.Options.SourcePath = "../kamenridercardgame-client";
                //    // Sử dụng lệnh npm start để khởi động React trong môi trường phát triển
                //    spa.UseReactDevelopmentServer(npmScript: "start");
                //});
            }
            app.UseCors(MyAllowSpecificOrigins);
            app.UseStaticFiles();

            app.UseMiddleware<SharedResource.Middleware.LoggingMiddleware>();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(enpoint =>
            {
                enpoint.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Characters}/{action=Index}/{id?}"
                );
            });
            app.UseHttpsRedirection();


            app.MapControllers();

            app.MapHub<LogHub>("/logHub");

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
    