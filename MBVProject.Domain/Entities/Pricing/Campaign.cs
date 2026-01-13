using MBVProject.Domain.Base;
using MBVProject.Domain.Enums;
using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities.Pricing
{
    public class Campaign : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public CampaignStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Priority { get; set; }
        public ICollection<CampaignRule> Rules { get; set; } = new List<CampaignRule>();
        public ICollection<Guid> DiscountIds { get; set; } = new List<Guid>();

        public bool IsActive()
        {
            var now = DateTime.UtcNow;
            return Status == CampaignStatus.Active &&
                   !IsDeleted &&
                   StartDate <= now &&
                   EndDate >= now;
        }

        public void Activate()
        {
            if (Status != CampaignStatus.Scheduled && Status != CampaignStatus.Paused)
                throw new InvalidOperationException($"Cannot activate campaign in {Status} status");

            Status = CampaignStatus.Active;
        }

        public void Pause()
        {
            if (Status != CampaignStatus.Active)
                throw new InvalidOperationException($"Cannot pause campaign in {Status} status");

            Status = CampaignStatus.Paused;
        }

        public void Cancel()
        {
            if (Status == CampaignStatus.Completed || Status == CampaignStatus.Cancelled)
                throw new InvalidOperationException($"Cannot cancel campaign in {Status} status");

            Status = CampaignStatus.Cancelled;
        }
    }
}
