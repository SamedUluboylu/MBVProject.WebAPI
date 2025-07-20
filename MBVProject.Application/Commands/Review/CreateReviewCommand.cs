using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Review
{
    public class CreateReviewCommand : IRequest<Guid>
    {
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public Guid OrderId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}