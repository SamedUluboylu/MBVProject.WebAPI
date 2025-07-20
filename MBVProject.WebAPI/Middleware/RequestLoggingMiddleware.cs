using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;

namespace MBVProject.WebAPI.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestLoggingMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context, ILogRepository logRepo)
        {
            // Request geldiğinde
            var logEntry = new LogEntry
            {
                Id = Guid.NewGuid(),
                Timestamp = DateTime.UtcNow,
                Level = "Info",
                Message = $"Request {context.Request.Method} {context.Request.Path}",
                Path = context.Request.Path,
                UserId = context.User.Identity?.IsAuthenticated == true
                    ? context.User.Identity.Name
                    : null
            };
            await logRepo.AddAsync(logEntry);

            await _next(context);
        }
    }
}
