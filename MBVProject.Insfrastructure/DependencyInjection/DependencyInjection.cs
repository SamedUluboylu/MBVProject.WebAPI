using MBVProject.Application.Commands.Users;
using MBVProject.Application.Handlers.Users;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using MBVProject.Infrastructure.Repositories;
using MBVProject.Infrastructure.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace MBVProject.Infrastructure.DependencyInjection
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
            services.AddScoped<ILogRepository, LogRepository>();

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}
