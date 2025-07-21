using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Wishlist
{
    public class GetWishlistQuery : IRequest<WishlistDto>
    {
        public Guid UserId { get; set; }
        public GetWishlistQuery(Guid userId) => UserId = userId;
    }
}
