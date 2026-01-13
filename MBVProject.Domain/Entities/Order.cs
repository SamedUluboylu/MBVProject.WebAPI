using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using MBVProject.Domain.Entities.Orders;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MBVProject.Domain.Entities
{
    public class Order : BaseEntity
    {
        public string OrderNumber { get; set; } = string.Empty;
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string ShippingAddress { get; set; } = string.Empty;
        public string? BillingAddress { get; set; }
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public decimal SubtotalAmount { get; set; }
        public decimal ShippingAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public string? CouponCode { get; set; }
        public string? CustomerNote { get; set; }
        public string? AdminNote { get; set; }
        public DateTime? ConfirmedAt { get; set; }
        public DateTime? ShippedAt { get; set; }
        public DateTime? DeliveredAt { get; set; }
        public DateTime? CancelledAt { get; set; }
        public string? CancellationReason { get; set; }
        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public Payment? Payment { get; set; }
        public Shipment? Shipment { get; set; }

        public void CalculateTotals()
        {
            SubtotalAmount = Items.Sum(item => item.GetLineTotal());
            TotalAmount = SubtotalAmount + ShippingAmount + TaxAmount - DiscountAmount;
        }

        public void Confirm()
        {
            if (Status != OrderStatus.Pending)
                throw new InvalidOperationException($"Cannot confirm order in {Status} status");

            Status = OrderStatus.Confirmed;
            ConfirmedAt = DateTime.UtcNow;
        }

        public void MarkAsProcessing()
        {
            if (Status != OrderStatus.Confirmed)
                throw new InvalidOperationException($"Cannot process order in {Status} status");

            Status = OrderStatus.Processing;
        }

        public void Ship()
        {
            if (Status != OrderStatus.Processing)
                throw new InvalidOperationException($"Cannot ship order in {Status} status");

            Status = OrderStatus.Shipped;
            ShippedAt = DateTime.UtcNow;
        }

        public void Deliver()
        {
            if (Status != OrderStatus.Shipped)
                throw new InvalidOperationException($"Cannot deliver order in {Status} status");

            Status = OrderStatus.Delivered;
            DeliveredAt = DateTime.UtcNow;
        }

        public void Cancel(string reason)
        {
            if (Status == OrderStatus.Delivered || Status == OrderStatus.Cancelled)
                throw new InvalidOperationException($"Cannot cancel order in {Status} status");

            Status = OrderStatus.Cancelled;
            CancelledAt = DateTime.UtcNow;
            CancellationReason = reason;
        }

        public bool CanBeCancelled()
        {
            return Status == OrderStatus.Pending || Status == OrderStatus.Confirmed;
        }
    }

    public class OrderItem : BaseEntity
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public Guid ProductId { get; set; }
        public Product Product { get; set; } = null!;
        public Guid? VariantId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? ProductSku { get; set; }
        public string? VariantAttributes { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal TaxAmount { get; set; }

        public decimal GetLineTotal() => (UnitPrice * Quantity) - DiscountAmount + TaxAmount;
        public decimal GetSubtotal() => UnitPrice * Quantity;
    }
}
