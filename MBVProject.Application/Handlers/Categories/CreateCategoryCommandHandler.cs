using MBVProject.Application.Commands.Categories;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Categories
{
    public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, Guid>
    {
        private readonly IRepository<Category> _repo;
        public CreateCategoryCommandHandler(IRepository<Category> repo) => _repo = repo;

        public async Task<Guid> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = new Category
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Slug = request.Slug,
                Description = request.Description,
                ParentId = request.ParentId,
                ImageUrl = request.ImageUrl
            };
            await _repo.AddAsync(category);
            return category.Id;
        }
    }
}
