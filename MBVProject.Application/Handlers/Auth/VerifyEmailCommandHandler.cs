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
    public class VerifyEmailCommandHandler : IRequestHandler<VerifyEmailCommand, bool>
    {
        private readonly IUserRepository _userRepo;
        public VerifyEmailCommandHandler(IUserRepository userRepo) => _userRepo = userRepo;

        public async Task<bool> Handle(VerifyEmailCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetByEmailAsync(request.Email);
            if (user == null) return false;
            if (user.EmailVerificationToken != request.Token || user.EmailVerificationExpiry < DateTime.UtcNow)
                return false;

            user.EmailConfirmed = true;
            user.EmailVerificationToken = null;
            user.EmailVerificationExpiry = null;
            await _userRepo.UpdateAsync(user);
            return true;
        }
    }
}   
