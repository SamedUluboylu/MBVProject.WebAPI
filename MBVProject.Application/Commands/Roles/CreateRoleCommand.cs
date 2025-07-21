using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Roles
{
    public class CreateRoleCommand : IRequest<Guid>
    {
        public string Name { get; set; } = string.Empty;
    }
}
