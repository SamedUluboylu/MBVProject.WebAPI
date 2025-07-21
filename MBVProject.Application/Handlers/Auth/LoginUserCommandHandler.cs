using MBVProject.Application.Commands.Auth;
using MBVProject.Application.DTOs.Auth;
using MBVProject.Application.DTOs.Auth.MBVProject.Application.DTOs.Auth;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, AuthResultDto?>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;

        public LoginUserCommandHandler(IUserRepository userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<AuthResultDto?> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash) ||
                !user.EmailConfirmed)
                return null;

            var roles = user.UserRoles.Select(r => r.Role.Name);
            user.RefreshToken = Guid.NewGuid().ToString();
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateAsync(user);

            var (token, expiration) = _jwtService.GenerateToken(user, roles);
            return new AuthResultDto
            {
                Token = token,
                Expiration = expiration,
                Roles = roles
            };
        }
    }
}
