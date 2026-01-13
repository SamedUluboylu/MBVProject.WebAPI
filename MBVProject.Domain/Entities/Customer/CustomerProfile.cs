using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Customer
{
    public class CustomerProfile : BaseEntity
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? ProfileImageUrl { get; set; }
        public string? PreferredLanguage { get; set; }
        public string? PreferredCurrency { get; set; }
        public bool NewsletterSubscription { get; set; }
        public decimal LoyaltyPoints { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalSpent { get; set; }

        public string GetFullName() => $"{FirstName} {LastName}".Trim();

        public void AddLoyaltyPoints(decimal points)
        {
            if (points < 0)
                throw new ArgumentException("Points cannot be negative", nameof(points));

            LoyaltyPoints += points;
        }

        public void RedeemLoyaltyPoints(decimal points)
        {
            if (points < 0)
                throw new ArgumentException("Points cannot be negative", nameof(points));

            if (LoyaltyPoints < points)
                throw new InvalidOperationException($"Insufficient loyalty points. Available: {LoyaltyPoints}, Requested: {points}");

            LoyaltyPoints -= points;
        }
    }
}
