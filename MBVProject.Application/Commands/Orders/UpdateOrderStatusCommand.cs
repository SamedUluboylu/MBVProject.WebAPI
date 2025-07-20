using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Orders
{
    public class UpdateOrderStatusCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
