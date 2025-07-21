using MBVProject.Application.DTOs.Addresses;
using MBVProject.Application.Queries.Addresses;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Addresses
{
    public class GetUserAddressesQueryHandler : IRequestHandler<GetUserAddressesQuery, List<AddressDto>>
    {
        private readonly IAddressRepository _addressRepo;
        public GetUserAddressesQueryHandler(IAddressRepository addressRepo)
        {
            _addressRepo = addressRepo;
        }

        public async Task<List<AddressDto>> Handle(GetUserAddressesQuery request, CancellationToken cancellationToken)
        {
            var addresses = await _addressRepo.FindAsync(a => a.UserId == request.UserId);
            return addresses.Select(a => new AddressDto
            {
                Id = a.Id,
                AddressLine = a.AddressLine,
                City = a.City,
                Country = a.Country,
                PostalCode = a.PostalCode
            }).ToList();
        }
    }    
}