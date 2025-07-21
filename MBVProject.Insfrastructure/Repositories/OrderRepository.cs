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
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Order> _dbSet;

        public OrderRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Order>();
        }

        public async Task<Order?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted);
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _dbSet.Where(o => !o.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<Order>> FindAsync(Expression<Func<Order, bool>> predicate)
        {
            return await _dbSet.Where(o => !o.IsDeleted).Where(predicate).ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<Order, bool>> predicate)
        {
            return await _dbSet.Where(o => !o.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<Order> Query()
        {
            return _dbSet.Where(o => !o.IsDeleted);
        }

        public async Task AddAsync(Order entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Order entity, string? updatedBy = null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = updatedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Order entity, string? deletedBy = null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(Order entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        // IOrderRepository özel metodu
        public async Task<IEnumerable<Order>> GetByUserIdAsync(Guid userId)
        {
            return await _dbSet.Where(o => o.UserId == userId && !o.IsDeleted).ToListAsync();
        }
    }
}