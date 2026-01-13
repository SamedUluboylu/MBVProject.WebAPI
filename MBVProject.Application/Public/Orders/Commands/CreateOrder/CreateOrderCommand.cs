using MBVProject.Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;

namespace MBVProject.Application.Public.Orders.Commands.CreateOrder
{
    public class CreateOrderCommand : IRequest<Result<Guid>>
    {
        public Guid UserId { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string? BillingAddress { get; set; }
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string? CustomerNote { get; set; }
        public string? CouponCode { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
    }

    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public Guid? VariantId { get; set; }
        public int Quantity { get; set; }
    }
}
