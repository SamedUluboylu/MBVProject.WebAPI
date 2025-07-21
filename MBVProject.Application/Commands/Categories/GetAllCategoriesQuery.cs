using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Categories
{
    /// <summary>
    /// Tüm kategorileri listelemek için sorgu.
    /// </summary>
    public class GetAllCategoriesQuery : IRequest<List<CategoryDto>>
    {
    }
}
