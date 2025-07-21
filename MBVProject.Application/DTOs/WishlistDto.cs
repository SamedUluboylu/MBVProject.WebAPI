using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.DTOs
{
    public class WishlistDto
    {
        public Guid UserId { get; set; }
        public List<WishlistItemDto> Items { get; set; } = new();
    }

    public class WishlistItemDto
    {
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
