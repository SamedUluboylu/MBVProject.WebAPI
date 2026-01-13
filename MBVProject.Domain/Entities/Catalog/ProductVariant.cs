using MBVProject.Domain.Base;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Catalog
{
    public class ProductVariant : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public string Sku { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? CompareAtPrice { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
        public ICollection<ProductVariantAttribute> Attributes { get; set; } = new List<ProductVariantAttribute>();

        public bool IsAvailable() => StockQuantity > 0 && !IsDeleted;
    }

    public class ProductVariantAttribute : BaseEntity
    {
        public Guid ProductVariantId { get; set; }
        public ProductVariant ProductVariant { get; set; } = null!;
        public Guid ProductAttributeId { get; set; }
        public ProductAttribute ProductAttribute { get; set; } = null!;
        public Guid ProductAttributeValueId { get; set; }
        public ProductAttributeValue ProductAttributeValue { get; set; } = null!;
    }
}
