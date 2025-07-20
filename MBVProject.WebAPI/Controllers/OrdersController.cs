using MBVProject.Application.Commands.Orders;
using MBVProject.Application.Queries.Orders;
using MBVProject.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MBVProject.WebAPI.Controllers
{

        [ApiController]
        [Route("api/orders")]
        [Authorize]
        public class OrdersController : ControllerBase
        {
            private readonly IMediator _mediator;
            public OrdersController(IMediator mediator) => _mediator = mediator;

            private Guid GetUserId() =>
                Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            [HttpGet]
            public async Task<IActionResult> GetMyOrders()
            {
                var result = await _mediator.Send(new GetOrdersByUserQuery(GetUserId()));
                return Ok(result);
            }

            [HttpPost]
            public async Task<IActionResult> Create([FromBody] CreateOrderCommand command)
            {
                command.UserId = GetUserId();
                var id = await _mediator.Send(command);
                return Ok(new { OrderId = id });
            }

            [HttpPut("{id:guid}/status")]
            [Authorize(Roles = "Admin")]
            public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateOrderStatusCommand command)
            {
                command.Id = id;
                var updated = await _mediator.Send(command);
                if (!updated) return NotFound();
                return NoContent();
            }
        }
    }