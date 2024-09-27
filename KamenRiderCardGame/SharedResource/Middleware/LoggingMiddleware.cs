using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using SharedResource.Hubs;

namespace SharedResource.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHubContext<LogHub> _hubContext;
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(RequestDelegate next,
            IHubContext<LogHub> hubContext,
            ILogger<LoggingMiddleware> logger)
        {
            _next = next;
            _hubContext = hubContext;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            _logger.LogInformation("Request: {Method} {Path}", context.Request.Method, context.Request.Path);

            await _next(context);
        }
    }
}
