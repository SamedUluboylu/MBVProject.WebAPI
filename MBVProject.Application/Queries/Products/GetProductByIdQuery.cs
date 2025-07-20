using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Products
{
    public class GetProductByIdQuery : IRequest<ProductDto?>
    {
        public Guid Id { get; set; }
        public GetProductByIdQuery(Guid id) => Id = id;
    }
}
