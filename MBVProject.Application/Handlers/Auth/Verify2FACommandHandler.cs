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
    public class Verify2FACommandHandler : IRequestHandler<Verify2FACommand, bool>
    {
        private readonly IUserRepository _userRepo;
        public Verify2FACommandHandler(IUserRepository userRepo) => _userRepo = userRepo;

        public async Task<bool> Handle(Verify2FACommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetByEmailAsync(request.Email);
            if (user == null) return false;
            if (user.TwoFactorCode != request.Code || user.TwoFactorExpiry < DateTime.UtcNow)
                return false;

            user.TwoFactorCode = null;
            user.TwoFactorExpiry = null;
            await _userRepo.UpdateAsync(user);
            return true;
        }
    }    
}