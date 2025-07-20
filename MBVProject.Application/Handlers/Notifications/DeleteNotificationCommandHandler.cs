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
    public class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, bool>
    {
        private readonly IRepository<Notification> _repo;
        public DeleteNotificationCommandHandler(IRepository<Notification> repo) => _repo = repo;

        public async Task<bool> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
        {
            var notif = await _repo.GetByIdAsync(request.Id);
            if (notif == null || notif.UserId != request.UserId) return false;

            await _repo.SoftDeleteAsync(notif);
            return true;
        }
    }
}