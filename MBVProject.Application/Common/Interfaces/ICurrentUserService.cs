using System;

namespace MBVProject.Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        Guid? UserId { get; }
        string? Username { get; }
        string? Email { get; }
        bool IsAuthenticated { get; }
        bool IsInRole(string role);
        string? GetClaim(string claimType);
    }
}
