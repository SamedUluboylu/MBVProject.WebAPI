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
            // Check if the Admin role exists, if not, create it
            var adminRole = await _roleManager.FindByNameAsync("Admin");
            if (adminRole == null)
            {
                var roleResult = await _roleManager.CreateAsync(new IdentityRole<Guid>("Admin"));
                if (!roleResult.Succeeded)
                    return false;
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
                return false; // If user creation fails, return false
            }

            // Add the user to the Admin role
            var addToRoleResult = await _userManager.AddToRoleAsync(user, "Admin");
            return addToRoleResult.Succeeded;
        }
    }   
}