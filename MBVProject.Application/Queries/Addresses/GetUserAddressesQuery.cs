using MBVProject.Application.DTOs.Addresses;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Addresses
{
    public class GetUserAddressesQuery : IRequest<List<AddressDto>>
    {
        public Guid UserId { get; set; }
        public GetUserAddressesQuery(Guid userId)
        {
            UserId = userId;
        }
    }
}