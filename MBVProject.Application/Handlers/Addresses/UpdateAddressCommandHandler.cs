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
    public class UpdateAddressCommandHandler : IRequestHandler<UpdateAddressCommand, bool>
    {
        private readonly IAddressRepository _addressRepo;
        public UpdateAddressCommandHandler(IAddressRepository addressRepo)
        {
            _addressRepo = addressRepo;
        }

        public async Task<bool> Handle(UpdateAddressCommand request, CancellationToken cancellationToken)
        {
            var address = await _addressRepo.GetByIdAsync(request.Id);
            if (address == null) return false;

            address.AddressLine = request.AddressLine;
            address.City = request.City;
            address.Country = request.Country;
            address.PostalCode = request.PostalCode;

            await _addressRepo.UpdateAsync(address);
            return true;
        }
    }   
}