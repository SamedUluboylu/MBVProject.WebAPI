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
    public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, bool>
    {
        private readonly IRepository<Cart> _repo;
        public UpdateCartItemCommandHandler(IRepository<Cart> repo)
        {
            _repo = repo;
        }

        public async Task<bool> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
        {
            // Cart'ı getir
            var cart = await _repo.GetByIdAsync(request.CartId);
            if (cart == null) return false;

            // İlgili item'i bul
            var item = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (item == null) return false;

            // Miktarı güncelle
            item.Quantity = request.Quantity;

            await _repo.UpdateAsync(cart);
            return true;
        }
    }
}