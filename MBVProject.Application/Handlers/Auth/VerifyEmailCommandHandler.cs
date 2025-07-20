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
            private readonly IUserRepository _userRepository;

            public VerifyEmailCommandHandler(IUserRepository userRepository)
            {
                _userRepository = userRepository;
            }

            public async Task<bool> Handle(VerifyEmailCommand request, CancellationToken cancellationToken)
            {
                var user = await _userRepository.GetByEmailAsync(request.Email);
                if (user == null) return false;

                // Yeni eklediğimiz VerificationToken ile kontrol
                if (user.VerificationToken != request.Token) return false;

                user.IsEmailConfirmed = true;
                user.VerificationToken = null;
                await _userRepository.UpdateAsync(user);

                return true;
            }
        }
    }