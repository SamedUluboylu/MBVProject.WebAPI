using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Catalog
{
    public class Stock : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Guid? ProductVariantId { get; set; }
        public int Quantity { get; set; }
        public int ReservedQuantity { get; set; }
        public int AvailableQuantity => Quantity - ReservedQuantity;
        public int LowStockThreshold { get; set; } = 10;
        public string? WarehouseLocation { get; set; }
        public DateTime? LastRestockDate { get; set; }

        public bool IsLowStock() => AvailableQuantity <= LowStockThreshold && AvailableQuantity > 0;
        public bool IsOutOfStock() => AvailableQuantity <= 0;

        public void Reserve(int quantity)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(quantity));

            if (AvailableQuantity < quantity)
                throw new InvalidOperationException($"Insufficient stock. Available: {AvailableQuantity}, Requested: {quantity}");

            ReservedQuantity += quantity;
        }

        public void Release(int quantity)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(quantity));

            if (ReservedQuantity < quantity)
                throw new InvalidOperationException($"Cannot release more than reserved. Reserved: {ReservedQuantity}, Requested: {quantity}");

            ReservedQuantity -= quantity;
        }

        public void AddStock(int quantity)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(quantity));

            Quantity += quantity;
            LastRestockDate = DateTime.UtcNow;
        }

        public void RemoveStock(int quantity)
        {
            if (quantity <= 0)
                throw new ArgumentException("Quantity must be positive", nameof(quantity));

            if (Quantity < quantity)
                throw new InvalidOperationException($"Cannot remove more stock than available. Current: {Quantity}, Requested: {quantity}");

            Quantity -= quantity;
        }
    }
}
