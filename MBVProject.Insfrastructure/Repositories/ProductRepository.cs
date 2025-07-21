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
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Product> _dbSet;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Product>();
        }

        public async Task AddAsync(Product entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _dbSet.Where(p => !p.IsDeleted).AsNoTracking().ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId)
        {
            return await _dbSet
                .Where(p => p.CategoryId == categoryId && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetFeaturedAsync()
        {
            return await _dbSet
                .Where(p => p.IsFeatured && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

        // 🔥 IRepository<Product> eksik metotlar
        public async Task<IEnumerable<Product>> FindAsync(Expression<Func<Product, bool>> predicate)
        {
            return await _dbSet.Where(p => !p.IsDeleted).Where(predicate).AsNoTracking().ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<Product, bool>> predicate)
        {
            return await _dbSet.Where(p => !p.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<Product> Query()
        {
            return _dbSet.Where(p => !p.IsDeleted).AsQueryable();
        }

        public async Task UpdateAsync(Product entity, string? updatedBy = null)
        {
            var existing = await _dbSet.FirstOrDefaultAsync(p => p.Id == entity.Id);
            if (existing == null) return;

            existing.Name = entity.Name;
            existing.Description = entity.Description;
            existing.Price = entity.Price;
            existing.StockQuantity = entity.StockQuantity;
            existing.CategoryId = entity.CategoryId;
            existing.IsFeatured = entity.IsFeatured;
            existing.UpdatedBy = updatedBy;
            existing.UpdatedAt = DateTime.UtcNow;

            _dbSet.Update(existing);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Product entity, string? deletedBy = null)
        {
            var existing = await _dbSet.FirstOrDefaultAsync(p => p.Id == entity.Id);
            if (existing == null) return;

            existing.IsDeleted = true;
            existing.DeletedBy = deletedBy;
            existing.DeletedAt = DateTime.UtcNow;

            _dbSet.Update(existing);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(Product entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}