using MBVProject.Application.Commands.Auth;
using MBVProject.Application.DTOs.Auth;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
    public class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, LoginResultDto?>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;

        public RefreshTokenCommandHandler(IUserRepository userRepository, IJwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        public async Task<LoginResultDto?> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            // Refresh token doğrulama
            var user = await _userRepository.GetByRefreshTokenAsync(request.RefreshToken);
            if (user == null || user.RefreshTokenExpiry < DateTime.UtcNow)
                return null;

            // Yeni token üret
            var roles = user.UserRoles.Select(r => r.Role.Name);
            var tokenResult = _jwtService.GenerateToken(user, roles);

            // Yeni refresh token oluştur ve kullanıcıyı güncelle
            user.RefreshToken = Guid.NewGuid().ToString();
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateAsync(user);

            return new LoginResultDto
            {
                Token = tokenResult.Token,
                Expiration = tokenResult.Expiration,
                RefreshToken = user.RefreshToken
            };
        }
    }
}
