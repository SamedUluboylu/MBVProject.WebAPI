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
    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly IRepository<Category> _repository;
        public UpdateCategoryCommandHandler(IRepository<Category> repository) => _repository = repository;

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _repository.GetByIdAsync(request.Id);
            if (category == null) return false;

            category.Name = request.Name;
            category.Slug = request.Slug;
            category.Description = request.Description;
            category.ParentId = request.ParentId;
            category.ImageUrl = request.ImageUrl;

            await _repository.UpdateAsync(category);
            return true;
        }
    }
}