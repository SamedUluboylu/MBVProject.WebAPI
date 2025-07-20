using MBVProject.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Seed
{
    public static class DataSeeder
    {
        public static async Task SeedAdminAsync(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            var adminRoleExists = await roleManager.RoleExistsAsync("Admin");
            if (!adminRoleExists)
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
            }

            var adminUser = await userManager.FindByEmailAsync("admin@egeapp.com");
            if (adminUser == null)
            {
                var user = new User
                {
                    UserName = "admin",
                    Email = "admin@egeapp.com",
                    FullName = "System Administrator",
                    IsEmailConfirmed = true
                };

                var result = await userManager.CreateAsync(user, "Admin123!"); // güçlü bir parola seç
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }    
}