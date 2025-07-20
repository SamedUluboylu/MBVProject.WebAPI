using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Categories
{
    public class GetCategoriesQuery : IRequest<IEnumerable<CategoryDto>> { }
}
