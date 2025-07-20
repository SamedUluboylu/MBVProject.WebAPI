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
    public class RemoveCartItemCommandHandler : IRequestHandler<RemoveCartItemCommand, bool>
    {
        private readonly IRepository<Cart> _repo;
        public RemoveCartItemCommandHandler(IRepository<Cart> repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(RemoveCartItemCommand request, CancellationToken cancellationToken)
        {
            // Cart'ı getir
            var cart = await _repo.GetByIdAsync(request.CartId);
            if (cart == null) return false;

            // İlgili item'i bul
            var item = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (item == null) return false;

            // Koleksiyondan çıkar
            cart.Items.Remove(item);

            await _repo.UpdateAsync(cart);
            return true;
        }
    }
}