using MBVProject.Application.Common.Models;
using MBVProject.Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Admin.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Result>
    {
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UpdateProductCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetByIdAsync(request.Id);
            if (product == null)
            {
                return Result.FailureResult("Product not found");
            }

            var existingProduct = await _productRepository.GetBySkuAsync(request.Sku);
            if (existingProduct != null && existingProduct.Id != request.Id)
            {
                return Result.FailureResult("Product with this SKU already exists");
            }

            product.Name = request.Name;
            product.Slug = request.Slug;
            product.Description = request.Description;
            product.ShortDescription = request.ShortDescription;
            product.Price = request.Price;
            product.CompareAtPrice = request.CompareAtPrice;
            product.Cost = request.Cost;
            product.StockQuantity = request.StockQuantity;
            product.Sku = request.Sku;
            product.Barcode = request.Barcode;
            product.CategoryId = request.CategoryId;
            product.BrandId = request.BrandId;
            product.Status = request.Status;
            product.IsFeatured = request.IsFeatured;
            product.AllowBackorder = request.AllowBackorder;
            product.Weight = request.Weight;
            product.Dimensions = request.Dimensions;
            product.MetaTitle = request.MetaTitle;
            product.MetaDescription = request.MetaDescription;
            product.MetaKeywords = request.MetaKeywords;

            await _productRepository.UpdateAsync(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.SuccessResult("Product updated successfully");
        }
    }
}
