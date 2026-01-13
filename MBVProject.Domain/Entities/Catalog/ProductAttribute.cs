using MBVProject.Domain.Base;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Catalog
{
    public class ProductAttribute : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int DisplayOrder { get; set; }
        public ICollection<ProductAttributeValue> Values { get; set; } = new List<ProductAttributeValue>();
    }

    public class ProductAttributeValue : BaseEntity
    {
        public Guid ProductAttributeId { get; set; }
        public ProductAttribute ProductAttribute { get; set; } = null!;
        public string Value { get; set; } = string.Empty;
        public string DisplayValue { get; set; } = string.Empty;
        public decimal PriceAdjustment { get; set; }
        public int DisplayOrder { get; set; }
    }
}
