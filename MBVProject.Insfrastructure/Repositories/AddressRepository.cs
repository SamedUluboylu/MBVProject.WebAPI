using MBVProject.Domain.Entities.Addresses;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Repositories
{
    public class AddressRepository : Repository<UserAddress>, IAddressRepository
    {
        private readonly AppDbContext _context;
        public AddressRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public Task<List<UserAddress>> GetAddressesWithCityAsync(string city)
        {
            return  _context.UserAddresses.Where(a => a.City == city).ToListAsync();

        }
    }
}