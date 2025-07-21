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
    public class SendVerificationEmailCommandHandler : IRequestHandler<SendVerificationEmailCommand, bool>
    {
        private readonly IUserRepository _userRepo;
        public SendVerificationEmailCommandHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<bool> Handle(SendVerificationEmailCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetByEmailAsync(request.Email);
            if (user == null) return false;
            user.EmailVerificationToken = Guid.NewGuid().ToString();
            user.EmailVerificationExpiry = DateTime.UtcNow.AddHours(24);
            await _userRepo.UpdateAsync(user);

            // TODO: Burada email gönderme işlemi yap (SMTP veya servis)
            return true;
        }
    }   
}