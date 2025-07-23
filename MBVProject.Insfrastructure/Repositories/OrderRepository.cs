using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository  
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Order> _dbSet;

        public OrderRepository(AppDbContext context):base(context)
        {
            _context = context;
            _dbSet = _context.Set<Order>();
        }
        public async Task<IEnumerable<Order>> GetByUserIdAsync(Guid userId)
        {
            return await _dbSet.Where(o => o.UserId == userId && !o.IsDeleted).ToListAsync();
        }
    }
}