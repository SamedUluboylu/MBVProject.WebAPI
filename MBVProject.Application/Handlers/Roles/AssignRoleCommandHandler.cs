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
    public class AssignRoleCommandHandler : IRequestHandler<AssignRoleCommand, bool>
    {
        private readonly IRoleRepository _roleRepo;
        public AssignRoleCommandHandler(IRoleRepository roleRepo) => _roleRepo = roleRepo;

        public async Task<bool> Handle(AssignRoleCommand request, CancellationToken cancellationToken)
        {
            return await _roleRepo.AssignRoleAsync(request.UserId, request.RoleId);
        }
    }
}
