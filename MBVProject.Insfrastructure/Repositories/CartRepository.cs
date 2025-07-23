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
    public class CartRepository : Repository<Cart>, ICartRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Cart> _dbSet;


        public CartRepository(AppDbContext context) : base(context)
        {
            _context = context;
            _dbSet = _context.Set<Cart>();

        }

        public async Task<Cart?> GetCartByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Include(c => c.Items) 
                .FirstOrDefaultAsync(c => c.UserId == userId && !c.IsDeleted);
        }
    }
}