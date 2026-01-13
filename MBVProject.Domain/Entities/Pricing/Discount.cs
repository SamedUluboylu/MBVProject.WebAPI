using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Pricing
{
    public class Discount : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DiscountType DiscountType { get; set; }
        public decimal Value { get; set; }
        public decimal? MaxDiscountAmount { get; set; }
        public decimal? MinOrderAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; } = true;
        public int? UsageLimitPerCustomer { get; set; }
        public int? TotalUsageLimit { get; set; }
        public int CurrentUsageCount { get; set; }
        public ICollection<Guid> ApplicableProductIds { get; set; } = new List<Guid>();
        public ICollection<Guid> ApplicableCategoryIds { get; set; } = new List<Guid>();

        public bool IsValid()
        {
            var now = DateTime.UtcNow;
            return IsActive &&
                   !IsDeleted &&
                   StartDate <= now &&
                   EndDate >= now &&
                   (TotalUsageLimit == null || CurrentUsageCount < TotalUsageLimit);
        }

        public decimal CalculateDiscount(decimal amount)
        {
            if (!IsValid())
                return 0;

            if (MinOrderAmount.HasValue && amount < MinOrderAmount.Value)
                return 0;

            decimal discountAmount = DiscountType switch
            {
                DiscountType.Percentage => amount * (Value / 100),
                DiscountType.FixedAmount => Value,
                _ => 0
            };

            if (MaxDiscountAmount.HasValue && discountAmount > MaxDiscountAmount.Value)
                discountAmount = MaxDiscountAmount.Value;

            return discountAmount;
        }
    }
}
