using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using MBVProject.Domain.Entities.Catalog;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public decimal Price { get; set; }
        public decimal? CompareAtPrice { get; set; }
        public decimal Cost { get; set; }
        public int StockQuantity { get; set; }
        public string Sku { get; set; } = string.Empty;
        public string? Barcode { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; } = null!;
        public Guid BrandId { get; set; }
        public Brand Brand { get; set; } = null!;
        public ProductStatus Status { get; set; } = ProductStatus.Draft;
        public bool IsFeatured { get; set; }
        public bool AllowBackorder { get; set; }
        public decimal Weight { get; set; }
        public string? Dimensions { get; set; }
        public int ViewCount { get; set; }
        public int SalesCount { get; set; }
        public decimal? AverageRating { get; set; }
        public int ReviewCount { get; set; }
        public string? MetaTitle { get; set; }
        public string? MetaDescription { get; set; }
        public string? MetaKeywords { get; set; }
        public ICollection<ProductImage> Images { get; set; } = new List<ProductImage>();
        public ICollection<ProductVariant> Variants { get; set; } = new List<ProductVariant>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        public bool IsAvailable() =>
            (Status == ProductStatus.Active || (AllowBackorder && Status == ProductStatus.Active))
            && !IsDeleted;

        public bool IsInStock() => StockQuantity > 0 || AllowBackorder;

        public void UpdateRating(decimal newRating, int totalReviews)
        {
            AverageRating = newRating;
            ReviewCount = totalReviews;
        }

        public void IncrementViewCount()
        {
            ViewCount++;
        }

        public void IncrementSalesCount(int quantity = 1)
        {
            SalesCount += quantity;
        }

        public decimal GetFinalPrice()
        {
            return Price;
        }

        public decimal? GetDiscountPercentage()
        {
            if (CompareAtPrice.HasValue && CompareAtPrice > Price)
            {
                return Math.Round(((CompareAtPrice.Value - Price) / CompareAtPrice.Value) * 100, 2);
            }
            return null;
        }
    }
}
