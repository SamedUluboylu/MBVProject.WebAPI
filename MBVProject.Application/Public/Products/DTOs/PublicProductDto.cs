using System;

namespace MBVProject.Application.Public.Products.DTOs
{
    public class PublicProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public decimal Price { get; set; }
        public decimal? CompareAtPrice { get; set; }
        public bool InStock { get; set; }
        public bool IsFeatured { get; set; }
        public decimal? AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string? CategoryName { get; set; }
        public string? BrandName { get; set; }
        public decimal? DiscountPercentage => CompareAtPrice.HasValue && CompareAtPrice > Price
            ? Math.Round(((CompareAtPrice.Value - Price) / CompareAtPrice.Value) * 100, 2)
            : null;
    }
}
