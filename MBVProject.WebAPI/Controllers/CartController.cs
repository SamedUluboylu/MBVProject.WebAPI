using MBVProject.Application.Commands.Cart;
using MBVProject.Application.Queries.Cart;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/cart")]
    [Authorize]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartController(IMediator mediator) => _mediator = mediator;
        private Guid GetUserId() => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);


        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> GetCart(Guid userId)
        {
            var cart = await _mediator.Send(new GetCartQuery(userId));
            return Ok(cart);
        }
        [HttpPost("items")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartCommand cmd)
        {
            cmd.UserId = GetUserId();
            var result = await _mediator.Send(cmd);
            return result ? Ok() : BadRequest();
        }

        [HttpPut("items/{productId:guid}")]
        public async Task<IActionResult> UpdateCartItem(Guid productId, [FromBody] UpdateCartItemCommand cmd)
        {
            cmd.ProductId = productId;
            var result = await _mediator.Send(cmd);
            return result ? Ok() : NotFound("Sepet ürünü bulunamadı.");
        }

        [HttpDelete("items/{productId:guid}")]
        public async Task<IActionResult> RemoveCartItem(Guid productId, [FromQuery] Guid cartId)
        {
            var cmd = new RemoveCartItemCommand
            {
                CartId = cartId,
                ProductId = productId
            };
            var result = await _mediator.Send(cmd);
            return result ? Ok() : NotFound("Sepette böyle bir ürün yok.");
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart([FromQuery] Guid cartId)
        {
            var cmd = new ClearCartCommand
            {
                CartId = cartId
            };
            var result = await _mediator.Send(cmd);
            return result ? Ok() : NotFound("Sepet bulunamadı.");
        }
    }
}
