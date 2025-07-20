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
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        private readonly IProductRepository _repository;
        public DeleteProductCommandHandler(IProductRepository repository) => _repository = repository;

        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _repository.GetByIdAsync(request.Id);
            if (product == null)
                return false;

            // Generic Repository'deki SoftDeleteAsync metoduna entity gönderiyoruz
            await _repository.SoftDeleteAsync(product);
            return true;
        }
    }
}
