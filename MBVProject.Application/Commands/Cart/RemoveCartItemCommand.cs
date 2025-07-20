using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Cart
{
    public class RemoveCartItemCommand : IRequest<bool>
    {
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
    }
}