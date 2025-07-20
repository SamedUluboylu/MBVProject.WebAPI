using MBVProject.Application.DTOs;
using MBVProject.Application.Queries.Users;
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
        public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, UserProfileDto?>
        {
            private readonly UserManager<User> _userManager;

            public GetUserProfileQueryHandler(UserManager<User> userManager)
            {
                _userManager = userManager;
            }

            public async Task<UserProfileDto?> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByIdAsync(request.UserId.ToString());
                if (user == null) return null;

                return new UserProfileDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email!,
                    Phone = user.PhoneNumber // IdentityUser’da Phone yerine PhoneNumber kullanılır
                };
            }
        }
    }