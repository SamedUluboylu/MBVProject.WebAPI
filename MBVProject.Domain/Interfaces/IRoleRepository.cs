using MBVProject.Domain.Entities.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IRoleRepository: IRepository<AppRole>
    {
        Task<bool> AssignRoleAsync(Guid userId, Guid roleId);
    }
}