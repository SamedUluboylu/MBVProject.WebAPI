using MBVProject.Application.Commands.Wishlist;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBVProject.WebAPI.Controllers;


[ApiController]
[Route("api/wishlist")]
[Authorize]
public class WishlistController : ControllerBase
{
    private readonly IMediator _mediator;
    public WishlistController(IMediator mediator) => _mediator = mediator;
    private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("items")]
    public async Task<IActionResult> Add([FromBody] AddToWishlistCommand cmd)
    {
        cmd.UserId = GetUserId();
        var result = await _mediator.Send(cmd);
        return result ? Ok() : BadRequest();
    }

    // Remove için benzer handler
}