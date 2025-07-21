using MBVProject.Application.Commands.Coupon;
using MBVProject.Application.Queries.Coupon;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CouponsController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _mediator.Send(new GetAllCouponsQuery()));

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id) => Ok(await _mediator.Send(new GetCouponByIdQuery(id)));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCouponCommand command)
            => Ok(await _mediator.Send(command));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCouponCommand command)
        {
            command.Id = id;
            return Ok(await _mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) => Ok(await _mediator.Send(new DeleteCouponCommand(id)));

        [HttpPost("apply")]
        public async Task<IActionResult> Apply([FromBody] ApplyCouponCommand command)
            => Ok(await _mediator.Send(command));
    }
}
