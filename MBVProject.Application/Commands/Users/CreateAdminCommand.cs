using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Users
{
    public class CreateAdminCommand : IRequest<bool>
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }   
}