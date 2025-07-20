using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Wishlist
{
    public class AddToWishlistCommand : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }
    }
}