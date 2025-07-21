using MBVProject.Application.Commands.Roles;
using MBVProject.Application.Queries.Roles;
using MBVProject.Infrastructure.Persistance;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public RolesController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _mediator.Send(new GetAllRolesQuery());
            return Ok(roles);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoleCommand command)
        {
            var id = await _mediator.Send(command);
            return id != Guid.Empty ? Ok(id) : BadRequest("Role already exists.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _mediator.Send(new DeleteRoleCommand { Id = id });
            return result ? Ok() : NotFound();
        }

        [HttpPost("assign")]
        public async Task<IActionResult> Assign([FromBody] AssignRoleCommand command)
        {
            var result = await _mediator.Send(command);
            return result ? Ok("Role assigned.") : BadRequest("User or Role not found.");
        }
    }
}
