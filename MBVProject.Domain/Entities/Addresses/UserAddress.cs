using MBVProject.Domain.Base;
using MBVProject.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities.Addresses
{
    public class UserAddress : BaseEntity
    {
        public Guid UserId { get; set; }
        public AppUser? User { get; set; }

        public string AddressLine { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
    }
}
