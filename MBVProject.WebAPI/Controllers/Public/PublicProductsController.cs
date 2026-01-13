using MBVProject.Application.Public.Products.Queries.GetProductCatalog;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MBVProject.WebAPI.Controllers.Public
{
    [ApiController]
    [Route("api/public/products")]
    public class PublicProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PublicProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCatalog([FromQuery] GetProductCatalogQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
