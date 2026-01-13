using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Reviews
{
    public class ReviewReply : BaseEntity
    {
        public Guid ReviewId { get; set; }
        public Review Review { get; set; } = null!;
        public Guid UserId { get; set; }
        public string Content { get; set; } = string.Empty;
        public bool IsAdminReply { get; set; }
    }
}
