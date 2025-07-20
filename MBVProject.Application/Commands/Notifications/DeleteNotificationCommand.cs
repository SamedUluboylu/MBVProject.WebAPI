using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Notifications
{
    public class DeleteNotificationCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
    }
}