using MBVProject.Application.Commands.Auth;
using MBVProject.Application.Commands.Cart;
using MBVProject.Application.Commands.Categories;
using MBVProject.Application.Commands.Orders;
using MBVProject.Application.Commands.Payments;
using MBVProject.Application.Commands.Products;
using MBVProject.Application.Commands.Users;
using MBVProject.Application.DTOs;
using MBVProject.Application.DTOs.Auth;
using MBVProject.Application.DTOs.User;
using MBVProject.Application.Handlers.Auth;
using MBVProject.Application.Handlers.Carts;
using MBVProject.Application.Handlers.Categories;
using MBVProject.Application.Handlers.Orders;
using MBVProject.Application.Handlers.Payments;
using MBVProject.Application.Handlers.Products;
using MBVProject.Application.Handlers.Users;
using MBVProject.Application.Queries.Cart;
using MBVProject.Application.Queries.Categories;
using MBVProject.Application.Queries.Orders;
using MBVProject.Application.Queries.Payments;
using MBVProject.Application.Queries.Products;
using MBVProject.Application.Queries.Shipments;
using MBVProject.Application.Queries.Users;
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
            // ✅ DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(connectionString));

            // ✅ Repositories
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

            // ✅ Services
            services.AddScoped<IJwtService, JwtService>();

            // ✅ MediatR - Tüm handler’ları tek seferde tarat
            services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssembly(Assembly.Load("MBVProject.Application")));

            return services;
        }
    }
}
