using MBVProject.Application.Admin.Products.DTOs;
using MBVProject.Application.Common.Models;
using MBVProject.Domain.Enums;
using MediatR;
using System;

namespace MBVProject.Application.Admin.Products.Queries.GetAllProducts
{
    public class GetAllProductsQuery : IRequest<PaginatedResult<AdminProductDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public string? SearchTerm { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? BrandId { get; set; }
        public ProductStatus? Status { get; set; }
        public string? SortBy { get; set; }
        public bool IsDescending { get; set; }
    }
}
