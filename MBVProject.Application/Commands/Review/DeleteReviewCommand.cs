using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Review
{
    public class DeleteReviewCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
    }
}