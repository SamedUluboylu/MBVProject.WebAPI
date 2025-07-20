using MBVProject.Application.DTOs;
using MBVProject.Application.Queries.Products;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Products
{
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IEnumerable<ProductDto>>
    {
        private readonly IProductRepository _repo;
        public GetProductsQueryHandler(IProductRepository repo) => _repo = repo;

        public async Task<IEnumerable<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _repo.GetAllAsync();
            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                CategoryId = p.CategoryId,
                BrandId = p.BrandId,
                ImageUrl = p.ImageUrl,
                IsFeatured = p.IsFeatured
            });
        }
    }
}
