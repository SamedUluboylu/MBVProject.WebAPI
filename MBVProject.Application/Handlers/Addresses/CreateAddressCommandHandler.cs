using MBVProject.Application.Commands.Addresses;
using MBVProject.Domain.Entities.Addresses;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Addresses
{
    public class CreateAddressCommandHandler : IRequestHandler<CreateAddressCommand, Guid>
    {
        private readonly IAddressRepository _addressRepo;
        public CreateAddressCommandHandler(IAddressRepository addressRepo)
        {
            _addressRepo = addressRepo;
        }

        public async Task<Guid> Handle(CreateAddressCommand request, CancellationToken cancellationToken)
        {
            var address = new UserAddress
            {
                UserId = request.UserId,
                AddressLine = request.AddressLine,
                City = request.City,
                Country = request.Country,
                PostalCode = request.PostalCode
            };

            await _addressRepo.AddAsync(address);
            return address.Id;
        }
    }   
}