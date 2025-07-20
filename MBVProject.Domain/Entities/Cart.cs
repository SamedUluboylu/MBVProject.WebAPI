using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
    public class Cart : BaseEntity
    {
        public Guid UserId { get; set; }
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
    }

    public class CartItem : BaseEntity
    {
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
