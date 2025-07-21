using MBVProject.Application.Commands.Users;
using MBVProject.Application.DTOs.Auth;
using MBVProject.Application.Queries.Users;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsersController(IMediator mediator) => _mediator = mediator;

        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpGet("getprofile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var profile = await _mediator.Send(new GetUserProfileQuery(userId));
            if (profile == null) return NotFound();
            return Ok(profile);
        }

        [HttpPut("sasa")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileCommand cmd)
        {
            cmd.UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _mediator.Send(cmd);
            return result ? Ok() : NotFound();
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand cmd)
        {
            cmd.UserId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await _mediator.Send(cmd);
            return result ? Ok() : BadRequest("Geçerli şifre hatalı veya işlem başarısız.");
        }
        [HttpPost("create-admin")]
        [Authorize(Roles = "Admin")] // Only allow admins to create other admins
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminCommand cmd)
        {
            // Check if the user has the appropriate role to create an admin
            if (!User.IsInRole("Admin"))
            {
                return Forbid(); // Return a 403 Forbidden if the user is not an admin
            }

            var result = await _mediator.Send(cmd);

            return result ? Ok("Admin user created successfully.") : BadRequest("Admin creation failed.");
        }
    }
}
