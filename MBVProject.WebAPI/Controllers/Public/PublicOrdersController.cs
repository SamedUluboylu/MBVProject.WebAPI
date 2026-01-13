using MBVProject.Application.Public.Orders.Commands.CreateOrder;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MBVProject.WebAPI.Controllers.Public
{
    [ApiController]
    [Route("api/public/orders")]
    [Authorize]
    public class PublicOrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PublicOrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand command)
        {
            var result = await _mediator.Send(command);

            if (!result.Success)
                return BadRequest(result);

            return CreatedAtAction(nameof(CreateOrder), new { id = result.Data }, result);
        }
    }
}
