using MBVProject.Application.Commands.Notifications;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Notifications
{
    public class MarkNotificationAsReadCommandHandler : IRequestHandler<MarkNotificationAsReadCommand, bool>
    {
        private readonly IRepository<Notification> _repo;
        public MarkNotificationAsReadCommandHandler(IRepository<Notification> repo) => _repo = repo;

        public async Task<bool> Handle(MarkNotificationAsReadCommand request, CancellationToken cancellationToken)
        {
            var notif = await _repo.GetByIdAsync(request.Id);
            if (notif == null || notif.UserId != request.UserId) return false;

            notif.IsRead = true;
            await _repo.UpdateAsync(notif);
            return true;
        }
    }
}