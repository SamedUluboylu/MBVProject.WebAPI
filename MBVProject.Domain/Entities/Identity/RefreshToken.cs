using MBVProject.Domain.Base;
using System;

namespace MBVProject.Domain.Entities.Identity
{
    public class RefreshToken : BaseEntity
    {
        public Guid UserId { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
        public string? ReplacedByToken { get; set; }
        public DateTime? RevokedAt { get; set; }
        public string? RevokedByIp { get; set; }
        public string? RevokedReason { get; set; }
        public string CreatedByIp { get; set; } = string.Empty;

        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public bool IsRevoked => RevokedAt.HasValue;
        public bool IsActive => !IsRevoked && !IsExpired;

        public void Revoke(string ip, string reason)
        {
            if (IsRevoked)
                throw new InvalidOperationException("Token is already revoked");

            RevokedAt = DateTime.UtcNow;
            RevokedByIp = ip;
            RevokedReason = reason;
        }
    }
}
