using MBVProject.Application.Commands.Orders;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Orders
{
    public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand, bool>
    {
        private readonly IRepository<Order> _repository;
        public UpdateOrderStatusCommandHandler(IRepository<Order> repository) => _repository = repository;

        public async Task<bool> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
        {
            var order = await _repository.GetByIdAsync(request.Id);
            if (order == null) return false;

            order.Status = request.Status;

            await _repository.UpdateAsync(order);
            return true;
        }
    }
}