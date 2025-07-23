using MBVProject.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
    public class Order:BaseEntity
    {
        public Guid UserId { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string? BillingAddress { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string? CouponCode { get; set; }
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
    }

    public class OrderItem:BaseEntity
    {
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public Guid? VariantId { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
