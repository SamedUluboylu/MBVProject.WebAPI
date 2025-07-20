using MBVProject.Application.Commands.Users;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Users
{
        public class UpdateUserProfileCommandHandler : IRequestHandler<UpdateUserProfileCommand, bool>
        {
            private readonly UserManager<User> _userManager;

            public UpdateUserProfileCommandHandler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<bool> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId.ToString());
                if (user == null) return false;

                // IdentityUser<Guid> içinde PhoneNumber var, kendi User modelinde Phone varsa onu da kullanabilirsin
                user.FullName = request.FullName;
                user.PhoneNumber = request.Phone;

                var result = await _userManager.UpdateAsync(user);
                return result.Succeeded;
            }
        }
    }