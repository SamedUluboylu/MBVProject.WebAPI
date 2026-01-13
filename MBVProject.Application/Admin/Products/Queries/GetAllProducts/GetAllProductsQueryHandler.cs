using MBVProject.Application.Admin.Products.DTOs;
using MBVProject.Application.Common.Models;
using MBVProject.Domain.Interfaces;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Admin.Products.Queries.GetAllProducts
{
    public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, PaginatedResult<AdminProductDto>>
    {
        private readonly IProductRepository _productRepository;

        public GetAllProductsQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<PaginatedResult<AdminProductDto>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            var query = await _productRepository.GetAllQueryableAsync();

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(p => p.Name.Contains(request.SearchTerm) ||
                                        p.Sku.Contains(request.SearchTerm) ||
                                        p.Description.Contains(request.SearchTerm));
            }

            if (request.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == request.CategoryId.Value);
            }

            if (request.BrandId.HasValue)
            {
                query = query.Where(p => p.BrandId == request.BrandId.Value);
            }

            if (request.Status.HasValue)
            {
                query = query.Where(p => p.Status == request.Status.Value);
            }

            query = request.SortBy?.ToLower() switch
            {
                "name" => request.IsDescending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
                "price" => request.IsDescending ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price),
                "stock" => request.IsDescending ? query.OrderByDescending(p => p.StockQuantity) : query.OrderBy(p => p.StockQuantity),
                "created" => request.IsDescending ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.CreatedAt)
            };

            var totalCount = query.Count();
            var items = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new AdminProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    Sku = p.Sku,
                    Price = p.Price,
                    CompareAtPrice = p.CompareAtPrice,
                    Cost = p.Cost,
                    StockQuantity = p.StockQuantity,
                    Status = p.Status,
                    IsFeatured = p.IsFeatured,
                    CategoryId = p.CategoryId,
                    BrandId = p.BrandId,
                    ViewCount = p.ViewCount,
                    SalesCount = p.SalesCount,
                    AverageRating = p.AverageRating,
                    ReviewCount = p.ReviewCount,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt
                })
                .ToList();

            return PaginatedResult<AdminProductDto>.Create(items, totalCount, request.PageNumber, request.PageSize);
        }
    }
}
