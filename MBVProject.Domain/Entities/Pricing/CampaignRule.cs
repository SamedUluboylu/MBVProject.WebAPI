using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Pricing
{
    public class CampaignRule : BaseEntity
    {
        public Guid CampaignId { get; set; }
        public Campaign Campaign { get; set; } = null!;
        public string RuleType { get; set; } = string.Empty;
        public string RuleCondition { get; set; } = string.Empty;
        public string RuleValue { get; set; } = string.Empty;
    }
}
