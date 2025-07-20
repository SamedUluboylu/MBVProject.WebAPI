using MBVProject.Application.Commands.Auth;
using MBVProject.Application.DTOs;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Auth
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResultDto?>
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public LoginCommandHandler(IUserRepository userRepository, IPasswordHasher<User> passwordHasher, IJwtTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<LoginResultDto?> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null) return null;

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
            if (result == PasswordVerificationResult.Failed) return null;

            // Roller çek
            var roles = new List<string> { user.Role }; // Identity kullanıyorsan UserManager.GetRolesAsync()

            var token = _jwtTokenGenerator.GenerateToken(user, roles);

            var refresh = Guid.NewGuid().ToString();
            user.RefreshToken = refresh;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateAsync(user);

            return new LoginResultDto
            {
                Token = token,
                RefreshToken = refresh,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    Role = user.Role
                }
            };
        }
    }    
}