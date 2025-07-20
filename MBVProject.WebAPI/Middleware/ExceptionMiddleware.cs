using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using Serilog;

namespace MBVProject.WebAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ILogRepository logRepo)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // LogEntry oluştur
                var logEntry = new LogEntry
                {
                    Id = Guid.NewGuid(),
                    Timestamp = DateTime.UtcNow,
                    Level = "Error",
                    Message = $"Unhandled exception: {ex.Message}",
                    Exception = ex.ToString(),
                    Path = context.Request.Path,
                    UserId = context.User.Identity?.IsAuthenticated == true
                        ? context.User.Identity.Name
                        : null
                };

                await logRepo.AddAsync(logEntry);

                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(new { message = "Internal Server Error" });
            }
        }
    }
}
