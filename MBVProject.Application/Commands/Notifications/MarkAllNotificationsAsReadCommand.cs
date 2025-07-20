using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Notifications
{
    public class MarkAllNotificationsAsReadCommand : IRequest<bool>
    {
        public Guid UserId { get; set; }
    }
}