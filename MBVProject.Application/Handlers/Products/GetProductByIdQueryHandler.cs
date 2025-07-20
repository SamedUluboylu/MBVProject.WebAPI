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
    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto?>
    {
        private readonly IProductRepository _repo;
        public GetProductByIdQueryHandler(IProductRepository repo) => _repo = repo;

        public async Task<ProductDto?> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var p = await _repo.GetByIdAsync(request.Id);
            return p == null ? null : new ProductDto
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
            };
        }
    }
}
