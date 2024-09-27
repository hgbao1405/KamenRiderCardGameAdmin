using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using KamenRiderCardGame.Data;
using SharedResource.Hubs;

namespace KamenRiderCardGame
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<KamenRiderCardGameContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("KamenRiderCardGameContext") ?? throw new InvalidOperationException("Connection string 'KamenRiderCardGameContext' not found.")));

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
            app.UseRouting();
            app.UseEndpoints(enpoint =>
            {
                enpoint.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Characters}/{action=Index}/{id?}"
                );
            });

            app.UseMiddleware<SharedResource.Middleware.LoggingMiddleware>();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapHub<LogHub>("/logHub");

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
    