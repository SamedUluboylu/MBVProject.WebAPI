using MBVProject.Domain.Entities.Payments;
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
    public class PaymentRepository : Repository<Payment>, IPaymentRepository    
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Payment> _dbSet;

        public PaymentRepository(AppDbContext context):base(context)
        {
            _context = context;
            _dbSet = _context.Set<Payment>();
        }
        public async Task<Payment?> GetByOrderIdAsync(Guid orderId)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.OrderId == orderId && !p.IsDeleted);
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _dbSet.Where(p => !p.IsDeleted).ToListAsync();
        }
    }
}
