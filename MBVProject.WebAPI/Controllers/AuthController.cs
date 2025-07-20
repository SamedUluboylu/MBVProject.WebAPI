using MBVProject.Application.Commands.Auth;
using MediatR;
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
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == null) return Unauthorized(new { message = "Invalid credentials" });
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command)
        {
            var result = await _mediator.Send(command);
            if (!result) return BadRequest(new { message = "Email already exists" });
            return Ok(new { success = true });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenCommand command)
        {
            var result = await _mediator.Send(command);
            if (result == null) return Unauthorized(new { message = "Invalid refresh token" });
            return Ok(result);
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            if (!result) return NotFound(new { message = "User not found" });
            return Ok(new { success = true });
        }
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
        {
            var result = await _mediator.Send(command);
            if (!result) return BadRequest(new { message = "Invalid token or expired" });
            return Ok(new { success = true });
        }
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailCommand command)
        {
            var result = await _mediator.Send(command);
            if (!result) return BadRequest(new { message = "Invalid verification token" });
            return Ok(new { success = true });
        }
    }
}
