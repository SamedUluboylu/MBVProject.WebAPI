using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetByCategoryAsync(Guid categoryId)
        {
            return await _context.Products
                .Where(p => p.CategoryId == categoryId && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetFeaturedAsync()
        {
            return await _context.Products
                .Where(p => p.IsFeatured && !p.IsDeleted)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Product?> GetBySkuAsync(string sku)
        {
            return await _context.Products
                .FirstOrDefaultAsync(p => p.Sku == sku && !p.IsDeleted);
        }

        public async Task<Product?> GetBySlugAsync(string slug)
        {
            return await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.Images)
                .Include(p => p.Variants)
                .Include(p => p.Reviews)
                .FirstOrDefaultAsync(p => p.Slug == slug && !p.IsDeleted);
        }

        public async Task<IQueryable<Product>> GetAllQueryableAsync()
        {
            return await Task.FromResult(_context.Products
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .AsQueryable());
        }
    }
}