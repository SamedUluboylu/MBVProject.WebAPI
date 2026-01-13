using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Orders
{
    public class Payment : BaseEntity
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; } = null!;
        public string PaymentNumber { get; set; } = string.Empty;
        public PaymentMethod PaymentMethod { get; set; }
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "USD";
        public string? TransactionId { get; set; }
        public string? PaymentGateway { get; set; }
        public string? GatewayResponse { get; set; }
        public string? CardLast4 { get; set; }
        public string? CardBrand { get; set; }
        public DateTime? AuthorizedAt { get; set; }
        public DateTime? CapturedAt { get; set; }
        public DateTime? RefundedAt { get; set; }
        public decimal? RefundedAmount { get; set; }
        public string? RefundReason { get; set; }
        public string? FailureReason { get; set; }
        public ICollection<PaymentTransaction> Transactions { get; set; } = new List<PaymentTransaction>();

        public void Authorize(string transactionId)
        {
            if (Status != PaymentStatus.Pending)
                throw new InvalidOperationException($"Cannot authorize payment in {Status} status");

            Status = PaymentStatus.Authorized;
            TransactionId = transactionId;
            AuthorizedAt = DateTime.UtcNow;
        }

        public void Capture()
        {
            if (Status != PaymentStatus.Authorized)
                throw new InvalidOperationException($"Cannot capture payment in {Status} status");

            Status = PaymentStatus.Captured;
            CapturedAt = DateTime.UtcNow;
        }

        public void Fail(string reason)
        {
            if (Status == PaymentStatus.Captured || Status == PaymentStatus.Refunded)
                throw new InvalidOperationException($"Cannot fail payment in {Status} status");

            Status = PaymentStatus.Failed;
            FailureReason = reason;
        }

        public void Refund(decimal amount, string reason)
        {
            if (Status != PaymentStatus.Captured)
                throw new InvalidOperationException($"Cannot refund payment in {Status} status");

            if (amount <= 0 || amount > Amount)
                throw new ArgumentException("Invalid refund amount");

            RefundedAmount = (RefundedAmount ?? 0) + amount;
            RefundReason = reason;
            RefundedAt = DateTime.UtcNow;

            if (RefundedAmount >= Amount)
                Status = PaymentStatus.Refunded;
            else
                Status = PaymentStatus.PartiallyRefunded;
        }
    }
}
