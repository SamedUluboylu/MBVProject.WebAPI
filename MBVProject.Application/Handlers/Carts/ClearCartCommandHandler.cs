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
    public class ClearCartCommandHandler : IRequestHandler<ClearCartCommand, bool>
    {
        private readonly IRepository<Cart> _repo;
        public ClearCartCommandHandler(IRepository<Cart> repo) => _repo = repo;

        public async Task<bool> Handle(ClearCartCommand request, CancellationToken cancellationToken)
        {
            var cart = await _repo.GetByIdAsync(request.CartId);
            if (cart == null) return false;

            cart.Items.Clear();
            await _repo.UpdateAsync(cart);
            return true;
        }
    }
}