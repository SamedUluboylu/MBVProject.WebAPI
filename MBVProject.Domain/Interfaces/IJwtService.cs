using MBVProject.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IJwtService
    {
        (string Token, DateTime Expiration) GenerateToken(AppUser user, IEnumerable<string> roles);
    }

}
