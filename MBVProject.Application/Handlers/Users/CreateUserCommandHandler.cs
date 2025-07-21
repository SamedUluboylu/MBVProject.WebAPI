using MBVProject.Application.Commands.Users;
using MBVProject.Domain.Entities.Users;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Users
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Guid>
    {
        private readonly IUserRepository _userRepository;
        public CreateUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Guid> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            // Aynı email var mı?
            var exists = await _userRepository.GetByEmailAsync(request.Email);
            if (exists != null) return Guid.Empty;

            var user = new AppUser
            {
                Email = request.Email,
                EmailConfirmed = request.EmailConfirmed,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            await _userRepository.AddAsync(user);
            return user.Id;
        }
    }   
}