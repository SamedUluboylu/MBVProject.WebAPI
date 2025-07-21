using MBVProject.Application.DTOs.Roles;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Roles
{
    public class GetAllRolesQuery : IRequest<List<RoleDto>> { }
}
