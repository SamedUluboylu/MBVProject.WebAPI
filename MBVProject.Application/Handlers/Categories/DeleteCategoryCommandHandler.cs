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
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, bool>
    {
        private readonly IRepository<Category> _repository;
        public DeleteCategoryCommandHandler(IRepository<Category> repository) => _repository = repository;

        public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _repository.GetByIdAsync(request.Id);
            if (category == null) return false;

            await _repository.SoftDeleteAsync(category);
            return true;
        }
    }
}
