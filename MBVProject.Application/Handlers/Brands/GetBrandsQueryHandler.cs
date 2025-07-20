using MBVProject.Application.DTOs;
using MBVProject.Application.Queries.Brands;
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
  public class GetBrandsQueryHandler : IRequestHandler<GetBrandsQuery, IEnumerable<BrandDto>>
    {
        private readonly IRepository<Brand> _repo;
        public GetBrandsQueryHandler(IRepository<Brand> repo) => _repo = repo;

        public async Task<IEnumerable<BrandDto>> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
        {
            var brands = await _repo.GetAllAsync();
            return brands.Select(b => new BrandDto
            {
                Id = b.Id,
                Name = b.Name,
                Slug = b.Slug,
                Description = b.Description,
                LogoUrl = b.LogoUrl
            });
        }
    }
}