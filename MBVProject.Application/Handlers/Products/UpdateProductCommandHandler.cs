using MBVProject.Application.Commands.Products;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Products
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly IProductRepository _repository;
        public UpdateProductCommandHandler(IProductRepository repository) => _repository = repository;

        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _repository.GetByIdAsync(request.Id);
            if (product == null) return false;

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.StockQuantity = request.StockQuantity;
            product.CategoryId = request.CategoryId;
            product.BrandId = request.BrandId;
            product.ImageUrl = request.ImageUrl;
            product.IsFeatured = request.IsFeatured;

            await _repository.UpdateAsync(product);
            return true;
        }
    }
}
