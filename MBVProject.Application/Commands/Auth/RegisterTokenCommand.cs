using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Auth
{
    public class RefreshTokenCommand : IRequest<LoginResultDto?>
    {
        public string RefreshToken { get; set; } = string.Empty;
    }
}
