using MBVProject.Application.Commands.Shipment;
using MBVProject.Application.Queries.Shipments;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipmentsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ShipmentsController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _mediator.Send(new GetAllShipmentsQuery()));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShipmentCommand command)
            => Ok(await _mediator.Send(command));
    }
}
