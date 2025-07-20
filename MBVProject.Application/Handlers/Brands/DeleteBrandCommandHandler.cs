using MBVProject.Application.Commands.Brands;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Brands
{
    public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand, bool>
    {
        private readonly IRepository<Brand> _repository;

        public DeleteBrandCommandHandler(IRepository<Brand> repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _repository.GetByIdAsync(request.Id);
            if (brand == null) return false;

            await _repository.SoftDeleteAsync(brand);
            return true;
        }
    }
}