using MBVProject.Application.Common.Models;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Admin.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Result<Guid>>
    {
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateProductCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Guid>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var existingProduct = await _productRepository.GetBySkuAsync(request.Sku);
            if (existingProduct != null)
            {
                return Result<Guid>.FailureResult("Product with this SKU already exists");
            }

            var product = new Product
            {
                Name = request.Name,
                Slug = request.Slug,
                Description = request.Description,
                ShortDescription = request.ShortDescription,
                Price = request.Price,
                CompareAtPrice = request.CompareAtPrice,
                Cost = request.Cost,
                StockQuantity = request.StockQuantity,
                Sku = request.Sku,
                Barcode = request.Barcode,
                CategoryId = request.CategoryId,
                BrandId = request.BrandId,
                Status = request.Status,
                IsFeatured = request.IsFeatured,
                AllowBackorder = request.AllowBackorder,
                Weight = request.Weight,
                Dimensions = request.Dimensions,
                MetaTitle = request.MetaTitle,
                MetaDescription = request.MetaDescription,
                MetaKeywords = request.MetaKeywords
            };

            await _productRepository.AddAsync(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<Guid>.SuccessResult(product.Id, "Product created successfully");
        }
    }
}
