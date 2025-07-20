using MBVProject.Application.Commands.Cart;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Carts
{
    public class AddToCartCommandHandler : IRequestHandler<AddToCartCommand, bool>
    {
        private readonly IRepository<Cart> _repo;
        public AddToCartCommandHandler(IRepository<Cart> repo) => _repo = repo;

        public async Task<bool> Handle(AddToCartCommand request, CancellationToken cancellationToken)
        {
            // Kartı bul
            var carts = await _repo.GetAllAsync();
            var cart = carts.FirstOrDefault(c => c.UserId == request.UserId);

            if (cart == null)
            {
                cart = new Cart { UserId = request.UserId };
                cart.Items.Add(new CartItem { ProductId = request.ProductId, Quantity = request.Quantity });
                await _repo.AddAsync(cart);
                return true;
            }

            var item = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (item == null)
                cart.Items.Add(new CartItem { ProductId = request.ProductId, Quantity = request.Quantity });
            else
                item.Quantity += request.Quantity;

            await _repo.UpdateAsync(cart);
            return true;
        }
    }
}