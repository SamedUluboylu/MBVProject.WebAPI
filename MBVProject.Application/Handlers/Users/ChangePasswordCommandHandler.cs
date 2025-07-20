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
        public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, bool>
        {
            private readonly UserManager<User> _userManager;

            public ChangePasswordCommandHandler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
            {
                // Kullanıcıyı bul
                var user = await _userManager.FindByIdAsync(request.UserId.ToString());
                if (user == null)
                    return false;

                // ASP.NET Identity'nin kendi ChangePasswordAsync metodunu kullan
                var result = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
                return result.Succeeded;
            }
        }
    }