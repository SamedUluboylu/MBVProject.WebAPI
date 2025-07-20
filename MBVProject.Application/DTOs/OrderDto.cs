using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.DTOs
{
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }

    public class OrderDto
    {
        public Guid Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public string? BillingAddress { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public List<OrderItemDto> Items { get; set; } = new();
    }
}
