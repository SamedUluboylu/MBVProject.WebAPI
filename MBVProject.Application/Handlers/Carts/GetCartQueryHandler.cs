using MBVProject.Application.DTOs;
using MBVProject.Application.Queries.Cart;
using MBVProject.Domain.Interfaces;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Carts
{
    public class GetCartQueryHandler : IRequestHandler<GetCartQuery, CartDto>
    {
        private readonly ICartRepository _cartRepository;

        public GetCartQueryHandler(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        public async Task<CartDto> Handle(GetCartQuery request, CancellationToken cancellationToken)
        {
            var cart = await _cartRepository.GetCartByUserIdAsync(request.UserId);
            if (cart == null)
                return new CartDto
                {
                    UserId = request.UserId,
                    Items = new System.Collections.Generic.List<CartItemDto>(),
                    TotalAmount = 0m
                };

            return new CartDto
            {
                UserId = cart.UserId,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice,
                    Discount = i.Discount,
                    EffectivePrice = (i.UnitPrice - i.Discount) * i.Quantity
                }).ToList(),
                TotalAmount = cart.TotalAmount
            };
        }
    }
}