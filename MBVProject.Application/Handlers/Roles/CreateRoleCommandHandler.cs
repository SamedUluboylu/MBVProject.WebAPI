using MBVProject.Application.Commands.Roles;
using MBVProject.Domain.Entities.Roles;
using MBVProject.Domain.Entities.Users;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Roles
{
    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, Guid>
    {
        private readonly IRoleRepository _roleRepo;
        public CreateRoleCommandHandler(IRoleRepository roleRepo) => _roleRepo = roleRepo;

        public async Task<Guid> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            if (await _roleRepo.AnyAsync(r => r.Name == request.Name))
            {
                return Guid.Empty;
            }

            var role = new AppRole { Name = request.Name };
            await _roleRepo.AddAsync(role);
            return role.Id;
        }
    }    
}