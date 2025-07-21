using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.DTOs.Auth
{
    namespace MBVProject.Application.DTOs.Auth
    {
        public class AuthResultDto
        {
            public string Token { get; set; } = null!;
            public DateTime Expiration { get; set; }
            public IEnumerable<string> Roles { get; set; } = Enumerable.Empty<string>();
        }
    }
}
