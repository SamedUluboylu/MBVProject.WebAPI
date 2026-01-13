using MBVProject.Application.Common.Models;
using MBVProject.Domain.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Admin.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Result>
    {
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public DeleteProductCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetByIdAsync(request.Id);
            if (product == null)
            {
                return Result.FailureResult("Product not found");
            }

            await _productRepository.DeleteAsync(product);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result.SuccessResult("Product deleted successfully");
        }
    }
}
