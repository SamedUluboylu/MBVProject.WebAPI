using MBVProject.Application.Common.Models;
using MBVProject.Application.Public.Products.DTOs;
using MBVProject.Domain.Enums;
using MBVProject.Domain.Interfaces;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Public.Products.Queries.GetProductCatalog
{
    public class GetProductCatalogQueryHandler : IRequestHandler<GetProductCatalogQuery, PaginatedResult<PublicProductDto>>
    {
        private readonly IProductRepository _productRepository;

        public GetProductCatalogQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<PaginatedResult<PublicProductDto>> Handle(GetProductCatalogQuery request, CancellationToken cancellationToken)
        {
            var query = await _productRepository.GetAllQueryableAsync();

            query = query.Where(p => p.Status == ProductStatus.Active && !p.IsDeleted);

            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                query = query.Where(p => p.Name.Contains(request.SearchTerm) ||
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

            if (request.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= request.MinPrice.Value);
            }

            if (request.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= request.MaxPrice.Value);
            }

            if (request.InStockOnly == true)
            {
                query = query.Where(p => p.StockQuantity > 0 || p.AllowBackorder);
            }

            query = request.SortBy?.ToLower() switch
            {
                "name" => request.IsDescending ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
                "price" => request.IsDescending ? query.OrderByDescending(p => p.Price) : query.OrderBy(p => p.Price),
                "rating" => query.OrderByDescending(p => p.AverageRating),
                "popular" => query.OrderByDescending(p => p.ViewCount),
                "newest" => query.OrderByDescending(p => p.CreatedAt),
                _ => query.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.CreatedAt)
            };

            var totalCount = query.Count();
            var items = query
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(p => new PublicProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Slug = p.Slug,
                    ShortDescription = p.ShortDescription,
                    Price = p.Price,
                    CompareAtPrice = p.CompareAtPrice,
                    InStock = p.StockQuantity > 0,
                    IsFeatured = p.IsFeatured,
                    AverageRating = p.AverageRating,
                    ReviewCount = p.ReviewCount,
                    CategoryName = p.Category.Name,
                    BrandName = p.Brand.Name
                })
                .ToList();

            return PaginatedResult<PublicProductDto>.Create(items, totalCount, request.PageNumber, request.PageSize);
        }
    }
}
