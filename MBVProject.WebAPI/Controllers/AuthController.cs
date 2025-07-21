using MBVProject.Application.Commands.Auth;
using MBVProject.Application.DTOs.Auth;
using MBVProject.Application.DTOs.Auth.MBVProject.Application.DTOs.Auth;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using MBVProject.WebAPI.Models;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AuthController(IMediator mediator) => _mediator = mediator;

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
        {
            AuthResultDto? result = await _mediator.Send(command);

            if (result == null)
            {
                var errorResponse = new ApiResponse<AuthResultDto>
                {
                    Success = false,
                    Message = "Email veya şifre hatalı ya da mail onaylanmamış."
                };
                return Unauthorized(errorResponse);
            }

            var successResponse = new ApiResponse<AuthResultDto>
            {
                Success = true,
                Data = result
            };
            return Ok(successResponse);
        }

        /// <summary>
        /// Yeni kullanıcı kaydı
        /// </summary>
        [HttpPost("register")]
        [AllowAnonymous] // Kayıt için yetki gerekmez
        public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
        {
            var success = await _mediator.Send(command);
            if (!success)
                return BadRequest("Bu email zaten kayıtlı.");

            return Ok("Kayıt başarılı. Lütfen mailinizi onaylayın.");
        }

        [HttpPost("send-verification-email")]
        public async Task<IActionResult> SendVerification([FromBody] SendVerificationEmailCommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("Verification email sent.") : BadRequest("User not found.");
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailCommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("Email verified.") : BadRequest("Invalid or expired token.");
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("Reset email sent.") : Ok(); // intentionally generic
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("Password reset.") : BadRequest("Invalid token or expired.");
        }

        [HttpPost("send-2fa")]
        public async Task<IActionResult> Send2FA([FromBody] Send2FACommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("2FA code sent.") : BadRequest("User not found.");
        }

        [HttpPost("verify-2fa")]
        public async Task<IActionResult> Verify2FA([FromBody] Verify2FACommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("2FA verified.") : BadRequest("Invalid or expired code.");
        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            var result = await _mediator.Send(new RefreshTokenCommand { RefreshToken = refreshTokenDto.RefreshToken });
            if (result == null)
                return Unauthorized(new { message = "Invalid or expired refresh token." });

            return Ok(result);
        }
    }
}
