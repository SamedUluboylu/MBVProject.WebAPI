using MBVProject.Application.Commands.Auth;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
        public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
        {
            private readonly IUserRepository _userRepo;
            public ResetPasswordCommandHandler(IUserRepository userRepo) => _userRepo = userRepo;

            public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepo.GetByEmailAsync(request.Email);
                if (user == null) return false;
                if (user.ResetPasswordToken != request.Token || user.ResetPasswordExpiry < DateTime.UtcNow)
                    return false;

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                user.ResetPasswordToken = null;
                user.ResetPasswordExpiry = null;
                await _userRepo.UpdateAsync(user);
                return true;
            }
        }      
}