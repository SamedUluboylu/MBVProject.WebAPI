using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Orders
{
    public class CreateOrderCommand : IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string? BillingAddress { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public List<OrderItemDto> Items { get; set; } = new();
    }
}
