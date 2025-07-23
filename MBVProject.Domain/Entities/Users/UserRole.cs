using MBVProject.Domain.Entities.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities.Users
{
    public class UserRole
    {
        public Guid UserId { get; set; }
        public AppUser? User { get; set; }
        public Guid RoleId { get; set; }
        public AppRole? Role { get; set; }
    }   
}