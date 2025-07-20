using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Categories
{
    public class DeleteCategoryCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
    }
}
