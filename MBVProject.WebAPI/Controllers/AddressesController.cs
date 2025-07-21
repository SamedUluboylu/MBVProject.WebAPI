using MBVProject.Application.DTOs.Addresses;
using MBVProject.Domain.Entities.Addresses;
using MBVProject.Infrastructure.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MBVProject.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AddressesController(AppDbContext context) => _context = context;

        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(Guid userId)
        {
            var addresses = await _context.UserAddresses.Where(a => a.UserId == userId).ToListAsync();
            return Ok(addresses);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateAddressDto dto)
        {
            var address = new UserAddress
            {
                UserId = dto.UserId,
                AddressLine = dto.AddressLine,
                City = dto.City,
                Country = dto.Country,
                PostalCode = dto.PostalCode
            };
            _context.UserAddresses.Add(address);
            await _context.SaveChangesAsync();
            return Ok(address);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, CreateAddressDto dto)
        {
            var address = await _context.UserAddresses.FindAsync(id);
            if (address == null) return NotFound();
            address.AddressLine = dto.AddressLine;
            address.City = dto.City;
            address.Country = dto.Country;
            address.PostalCode = dto.PostalCode;
            await _context.SaveChangesAsync();
            return Ok(address);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var address = await _context.UserAddresses.FindAsync(id);
            if (address == null) return NotFound();
            _context.UserAddresses.Remove(address);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}
