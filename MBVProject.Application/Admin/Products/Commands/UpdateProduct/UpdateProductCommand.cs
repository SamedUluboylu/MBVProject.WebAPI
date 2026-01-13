using MBVProject.Application.Common.Models;
using MBVProject.Domain.Enums;
using MediatR;
using System;

namespace MBVProject.Application.Admin.Products.Commands.UpdateProduct
{
    public class UpdateProductCommand : IRequest<Result>
    {
        public Guid Id { get; set; }
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
        public Guid BrandId { get; set; }
        public ProductStatus Status { get; set; }
        public bool IsFeatured { get; set; }
        public bool AllowBackorder { get; set; }
        public decimal Weight { get; set; }
        public string? Dimensions { get; set; }
        public string? MetaTitle { get; set; }
        public string? MetaDescription { get; set; }
        public string? MetaKeywords { get; set; }
    }
}
