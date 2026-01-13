using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Catalog
{
    public class ProductImage : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public string ImageUrl { get; set; } = string.Empty;
        public string? AltText { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsPrimary { get; set; }
    }
}
