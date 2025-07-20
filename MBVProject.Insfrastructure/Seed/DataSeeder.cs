using MBVProject.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Seed
{
    public static class DataSeeder
    {
        public static async Task SeedAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            // Admin rolü mevcut mu kontrol et
            var adminRoleExists = await roleManager.RoleExistsAsync("Admin");
            if (!adminRoleExists)
            {
                // Eğer Admin rolü yoksa, yeni rolü oluştur
                await roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
            }

            // Admin kullanıcı var mı kontrol et
            var adminUser = await userManager.FindByEmailAsync("admin@egeapp.com");
            if (adminUser == null)
            {
                var user = new User
                {
                    UserName = "admin",
                    Email = "admin@egeapp.com",
                    FullName = "Admin User",
                    IsEmailConfirmed = true // E-posta onaylı olsun
                };

                var result = await userManager.CreateAsync(user, "Admin@1234");  // Admin şifresi
                if (result.Succeeded)
                {
                    // Admin kullanıcısına Admin rolü ekle
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}
