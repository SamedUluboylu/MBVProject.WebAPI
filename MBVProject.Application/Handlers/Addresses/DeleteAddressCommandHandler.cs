using MBVProject.Application.Commands.Addresses;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Addresses
{
    public class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand, bool>
    {
        private readonly IAddressRepository _addressRepo;
        public DeleteAddressCommandHandler(IAddressRepository addressRepo)
        {
            _addressRepo = addressRepo;
        }

        public async Task<bool> Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
        {
            var address = await _addressRepo.GetByIdAsync(request.Id);
            if (address == null) return false;

            await _addressRepo.SoftDeleteAsync(address);
            return true;
        }
    }    
}