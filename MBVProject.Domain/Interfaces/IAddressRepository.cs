using MBVProject.Domain.Entities.Addresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IAddressRepository : IRepository<UserAddress>
    {
        Task<List<UserAddress>> GetAddressesWithCityAsync(string city);
    }
}
