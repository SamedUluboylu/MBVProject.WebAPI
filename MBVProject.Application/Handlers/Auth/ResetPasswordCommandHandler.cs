using MBVProject.Application.Commands.Auth;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
    public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _hasher;

        public ResetPasswordCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null) return false;

            if (user.ResetToken != request.Token || user.ResetTokenExpiry < DateTime.UtcNow)
                return false;

            user.PasswordHash = _hasher.HashPassword(user, request.NewPassword);
            user.ResetToken = null;
            user.ResetTokenExpiry = null;

            await _userRepository.UpdateAsync(user);
            return true;
        }
    }
}