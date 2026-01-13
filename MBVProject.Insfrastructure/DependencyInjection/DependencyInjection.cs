using FluentValidation;
using MBVProject.Application.Common.Behaviors;
using MBVProject.Application.Common.Interfaces;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using MBVProject.Infrastructure.Repositories;
using MBVProject.Infrastructure.Services;
using MBVProject.Infrastructure.UnitOfWork;
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
            services.AddScoped<IAddressRepository, AddressRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<ILogRepository, LogRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IOutboxRepository, OutboxRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>();

            services.AddScoped<IJwtService, JwtService>();
            services.AddMemoryCache();
            services.AddScoped<ICacheService, InMemoryCacheService>();
            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            var applicationAssembly = Assembly.Load("MBVProject.Application");

            services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssembly(applicationAssembly));

            services.AddValidatorsFromAssembly(applicationAssembly);

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

            return services;
        }
    }
}
