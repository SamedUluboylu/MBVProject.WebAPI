using MBVProject.Application.Commands.Users;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Users
{
    public class CreateAdminCommandHandler : IRequestHandler<CreateAdminCommand, bool>
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole<Guid>> _roleManager;

        public CreateAdminCommandHandler(UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<bool> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
        {
            try
            {
                // Check if the Admin role exists, if not, create it
                var adminRole = await _roleManager.FindByNameAsync("Admin");
                if (adminRole == null)
                {
                    var roleResult = await _roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
                    if (!roleResult.Succeeded)
                        throw new Exception("Failed to create Admin role.");
                }

                // Create the admin user
                var user = new User
                {
                    UserName = request.Email,
                    Email = request.Email,
                    FullName = request.FullName,
                    IsEmailConfirmed = true // Optionally set to true
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    throw new Exception("Failed to create admin user.");
                }

                // Add the user to the Admin role
                var addToRoleResult = await _userManager.AddToRoleAsync(user, "Admin");
                if (!addToRoleResult.Succeeded)
                {
                    throw new Exception("Failed to assign Admin role to user.");
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception here if needed
                // You could also consider returning more detailed error messages depending on the needs of the application
                return false;
            }
        }
    }
}