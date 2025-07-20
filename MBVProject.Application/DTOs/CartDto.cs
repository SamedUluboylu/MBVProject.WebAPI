using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.DTOs
{
    public class CartItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CartDto
    {
        public Guid Id { get; set; }
        public List<CartItemDto> Items { get; set; } = new();
    }
}