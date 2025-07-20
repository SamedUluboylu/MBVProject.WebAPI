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
    public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, Guid>
    {
        private readonly IRepository<Brand> _repo;
        public CreateBrandCommandHandler(IRepository<Brand> repo) => _repo = repo;

        public async Task<Guid> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = new Brand
            {
                Name = request.Name,
                Slug = request.Slug,
                Description = request.Description,
                LogoUrl = request.LogoUrl
            };
            await _repo.AddAsync(brand);
            return brand.Id;
        }
    }
}