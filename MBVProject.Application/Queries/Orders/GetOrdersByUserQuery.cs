using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Orders
{
    public class GetOrdersByUserQuery : IRequest<IEnumerable<OrderDto>>
    {
        public Guid UserId { get; set; }
        public GetOrdersByUserQuery(Guid userId) => UserId = userId;
    }
}
