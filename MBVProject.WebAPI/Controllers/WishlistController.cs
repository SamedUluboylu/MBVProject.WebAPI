using MBVProject.Application.Commands.Wishlist;
using MBVProject.Application.Queries.Wishlist;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBVProject.WebAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class WishlistController : ControllerBase
{
    private readonly IMediator _mediator;
    public WishlistController(IMediator mediator) => _mediator = mediator;

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] Guid userId)
        => Ok(await _mediator.Send(new GetWishlistQuery(userId)));

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] AddToWishlistCommand command)
        => Ok(await _mediator.Send(command));

    [HttpDelete("{productId}")]
    public async Task<IActionResult> Remove(Guid productId, [FromQuery] Guid userId)
        => Ok(await _mediator.Send(new RemoveFromWishlistCommand(userId, productId)));
}
