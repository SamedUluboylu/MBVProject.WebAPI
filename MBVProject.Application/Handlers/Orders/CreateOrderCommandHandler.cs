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
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Guid>
    {
        private readonly IOrderRepository _repo;
        public CreateOrderCommandHandler(IOrderRepository repo) => _repo = repo;

        public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                ShippingAddress = request.ShippingAddress,
                BillingAddress = request.BillingAddress,
                PaymentMethod = request.PaymentMethod,
                Status = "Pending",
                Items = request.Items.Select(i => new OrderItem
                {
                    Id = Guid.NewGuid(),
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList()
            };
            await _repo.AddAsync(order);
            return order.Id;
        }
    }
}