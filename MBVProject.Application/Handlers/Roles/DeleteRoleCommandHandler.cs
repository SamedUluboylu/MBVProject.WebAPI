using MBVProject.Application.Commands.Roles;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Roles
{
    public class DeleteRoleCommandHandler : IRequestHandler<DeleteRoleCommand, bool>
    {
        private readonly IRoleRepository _roleRepo;
        public DeleteRoleCommandHandler(IRoleRepository roleRepo) => _roleRepo = roleRepo;

        public async Task<bool> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await _roleRepo.GetByIdAsync(request.Id);
            if (role == null) return false;
            await _roleRepo.SoftDeleteAsync(role);
            return true;
        }
    }    
}