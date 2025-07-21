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
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Cart> _dbSet;

        public CartRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Cart>();
        }

        public async Task<Cart?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
        }

        public async Task<IEnumerable<Cart>> GetAllAsync()
        {
            return await _dbSet.Where(c => !c.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<Cart>> FindAsync(Expression<Func<Cart, bool>> predicate)
        {
            return await _dbSet.Where(c => !c.IsDeleted).Where(predicate).ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<Cart, bool>> predicate)
        {
            return await _dbSet.Where(c => !c.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<Cart> Query()
        {
            return _dbSet.Where(c => !c.IsDeleted);
        }

        public async Task AddAsync(Cart entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Cart entity, string? updatedBy = null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = updatedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Cart entity, string? deletedBy = null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(Cart entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
        public async Task<Cart?> GetCartByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Include(c => c.Items) // Eğer Cart entity’sinde Items koleksiyonu varsa yüklemek için
                .FirstOrDefaultAsync(c => c.UserId == userId && !c.IsDeleted);
        }
    }
}