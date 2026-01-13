using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Orders
{
    public class Shipment : BaseEntity
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public string TrackingNumber { get; set; } = string.Empty;
        public string Carrier { get; set; } = string.Empty;
        public ShipmentStatus Status { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal ShippingCost { get; set; }
        public DateTime? ShippedDate { get; set; }
        public DateTime? EstimatedDeliveryDate { get; set; }
        public DateTime? ActualDeliveryDate { get; set; }
        public ICollection<ShipmentHistory> History { get; set; } = new List<ShipmentHistory>();

        public void UpdateStatus(ShipmentStatus newStatus, string note, string updatedBy)
        {
            if (Status == newStatus)
                return;

            var history = new ShipmentHistory
            {
                ShipmentId = Id,
                Status = newStatus,
                Note = note,
                UpdatedBy = updatedBy,
                Timestamp = DateTime.UtcNow
            };

            History.Add(history);
            Status = newStatus;

            if (newStatus == ShipmentStatus.Shipped && !ShippedDate.HasValue)
                ShippedDate = DateTime.UtcNow;

            if (newStatus == ShipmentStatus.Delivered && !ActualDeliveryDate.HasValue)
                ActualDeliveryDate = DateTime.UtcNow;
        }
    }
}
