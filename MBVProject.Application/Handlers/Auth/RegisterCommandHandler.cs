using MBVProject.Application.Commands.Auth;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly IUserRepository _userRepository;
        public RegisterCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var existing = await _userRepository.GetByEmailAsync(request.Email);
            if (existing != null) return false;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = request.Email,
                PasswordHash = request.Password, // burada hashleme yapılmalı
                FullName = request.FullName,
                Role = "User",
            };

            await _userRepository.AddAsync(user);
            return true;
        }
    }
}
