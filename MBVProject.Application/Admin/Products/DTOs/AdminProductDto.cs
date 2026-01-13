using MBVProject.Domain.Enums;
using System;

namespace MBVProject.Application.Admin.Products.DTOs
{
    public class AdminProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? CompareAtPrice { get; set; }
        public decimal Cost { get; set; }
        public int StockQuantity { get; set; }
        public ProductStatus Status { get; set; }
        public bool IsFeatured { get; set; }
        public Guid CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public Guid BrandId { get; set; }
        public string? BrandName { get; set; }
        public int ViewCount { get; set; }
        public int SalesCount { get; set; }
        public decimal? AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public decimal? Margin => Cost > 0 ? ((Price - Cost) / Cost) * 100 : null;
    }
}
