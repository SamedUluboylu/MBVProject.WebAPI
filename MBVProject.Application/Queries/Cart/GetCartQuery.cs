using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Cart
{
    public class GetCartQuery : IRequest<CartDto>
    {
        public Guid UserId { get; set; }

        public GetCartQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}