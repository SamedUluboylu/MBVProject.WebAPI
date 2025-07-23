using MBVProject.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
    public class Wishlist : BaseEntity
    {
        public Guid UserId { get; set; }
        public ICollection<WishlistItem> Items { get; set; } = new List<WishlistItem>();
    }

    public class WishlistItem : BaseEntity
    {
        public Guid WishlistId { get; set; }
        public Guid ProductId { get; set; }
    }
}