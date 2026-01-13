using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;

namespace MBVProject.Domain.Entities.Orders
{
    public class PaymentTransaction : BaseEntity
    {
        public Guid PaymentId { get; set; }
        public Payment Payment { get; set; } = null!;
        public string TransactionId { get; set; } = string.Empty;
        public PaymentStatus Status { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string? GatewayResponse { get; set; }
        public string? ErrorMessage { get; set; }
        public DateTime ProcessedAt { get; set; } = DateTime.UtcNow;
    }
}
