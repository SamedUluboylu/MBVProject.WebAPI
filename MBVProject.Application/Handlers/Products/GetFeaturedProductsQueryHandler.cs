using MBVProject.Application.DTOs;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Products
{
    public class GetFeaturedProductsQueryHandler : IRequestHandler<GetFeaturedProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IProductRepository _repo;

        public GetFeaturedProductsQueryHandler(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<ProductDto>> Handle(GetFeaturedProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _repo.GetFeaturedAsync();
            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description
            });
        }
    }
}