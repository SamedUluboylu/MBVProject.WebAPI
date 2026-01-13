using MBVProject.Application.Common.Models;
using MBVProject.Application.Public.Products.DTOs;
using MediatR;
using System;

namespace MBVProject.Application.Public.Products.Queries.GetProductCatalog
{
    public class GetProductCatalogQuery : IRequest<PaginatedResult<PublicProductDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? SearchTerm { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? BrandId { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public bool? InStockOnly { get; set; } = true;
        public string? SortBy { get; set; }
        public bool IsDescending { get; set; }
    }
}
