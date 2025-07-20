using MBVProject.Domain.Entities;
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
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Product entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _context.Products.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId)
        {
            return await _context.Products
                .Where(p => p.CategoryId == categoryId)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            return await _context.Products.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Product>> GetFeaturedAsync()
        {
            return await _context.Products
                .Where(p => p.IsFeatured && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task UpdateAsync(Product entity, string? updatedBy = null)
        {
            var existing = await _context.Products.FirstOrDefaultAsync(p => p.Id == entity.Id);
            if (existing == null) return;

            // Update properties
            existing.Name = entity.Name;
            existing.Description = entity.Description;
            existing.Price = entity.Price;
            existing.StockQuantity = entity.StockQuantity;
            existing.CategoryId = entity.CategoryId;
            existing.IsFeatured = entity.IsFeatured;
            existing.UpdatedBy = updatedBy;
            existing.UpdatedAt = DateTime.UtcNow;

            _context.Products.Update(existing);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Product entity, string? deletedBy = null)
        {
            var existing = await _context.Products.FirstOrDefaultAsync(p => p.Id == entity.Id);
            if (existing == null) return;

            existing.IsDeleted = true;
            existing.DeletedBy = deletedBy;
            existing.DeletedAt = DateTime.UtcNow;

            _context.Products.Update(existing);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(Product entity)
        {
            _context.Products.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
