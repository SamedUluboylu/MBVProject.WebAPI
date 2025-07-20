using MBVProject.Application.DTOs;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Products
{
    public class GetFeaturedProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
    }
}
