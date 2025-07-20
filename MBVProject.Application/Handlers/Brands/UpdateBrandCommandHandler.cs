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
    public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommand, bool>
    {
        private readonly IRepository<Brand> _repository;
        public UpdateBrandCommandHandler(IRepository<Brand> repository) => _repository = repository;

        public async Task<bool> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _repository.GetByIdAsync(request.Id);
            if (brand == null) return false;

            brand.Name = request.Name;
            brand.Slug = request.Slug;
            brand.Description = request.Description;
            brand.LogoUrl = request.LogoUrl;

            await _repository.UpdateAsync(brand);
            return true;
        }
    }
}
