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
    public class Send2FACommandHandler : IRequestHandler<Send2FACommand, bool>
    {
        private readonly IUserRepository _userRepo;
        public Send2FACommandHandler(IUserRepository userRepo) => _userRepo = userRepo;

        public async Task<bool> Handle(Send2FACommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetByEmailAsync(request.Email);
            if (user == null) return false;

            var code = new Random().Next(100000, 999999).ToString();
            user.TwoFactorCode = code;
            user.TwoFactorExpiry = DateTime.UtcNow.AddMinutes(5);
            await _userRepo.UpdateAsync(user);

            // TODO: SMS ya da e‑posta gönder
            return true;
        }
    }   
}