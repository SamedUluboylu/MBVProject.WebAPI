using MBVProject.Application.DTOs;
using MBVProject.Application.Queries.Orders;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Orders
{
    public class GetOrdersByUserQueryHandler : IRequestHandler<GetOrdersByUserQuery, IEnumerable<OrderDto>>
    {
        private readonly IOrderRepository _repo;
        public GetOrdersByUserQueryHandler(IOrderRepository repo) => _repo = repo;

        public async Task<IEnumerable<OrderDto>> Handle(GetOrdersByUserQuery request, CancellationToken cancellationToken)
        {
            var orders = await _repo.GetByUserIdAsync(request.UserId);
            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                Status = o.Status,
                ShippingAddress = o.ShippingAddress,
                BillingAddress = o.BillingAddress,
                PaymentMethod = o.PaymentMethod,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList()
            });
        }
    }
}