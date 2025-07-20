using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Users
{
    public class GetUserProfileQuery : IRequest<UserProfileDto>
    {
        public Guid UserId { get; set; }
        public GetUserProfileQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}