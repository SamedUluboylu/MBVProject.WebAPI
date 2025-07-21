using MBVProject.Application.DTOs.Auth;
using MBVProject.Application.DTOs.Auth.MBVProject.Application.DTOs.Auth;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Auth
{

    public class LoginUserCommand : IRequest<AuthResultDto?>
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }   
}