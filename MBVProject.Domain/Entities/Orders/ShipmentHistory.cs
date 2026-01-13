using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;

namespace MBVProject.Domain.Entities.Orders
{
    public class ShipmentHistory : BaseEntity
    {
        public Guid ShipmentId { get; set; }
        public Shipment Shipment { get; set; } = null!;
        public ShipmentStatus Status { get; set; }
        public string Note { get; set; } = string.Empty;
        public string? Location { get; set; }
        public string UpdatedBy { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
