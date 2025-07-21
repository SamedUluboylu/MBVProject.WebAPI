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
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<T>();
        }

        public async Task<T?> GetByIdAsync(Guid id)
        {
            return await _dbSet.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.Where(x => !x.IsDeleted).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(x => !x.IsDeleted).Where(predicate).AsNoTracking().ToListAsync();
            return await _dbSet.Where(x => !x.IsDeleted).Where(predicate).AsNoTracking().ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            // Silinmemişler arasında kontrol et
            return await _dbSet.Where(x => !x.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<T> Query()
        {
            // LINQ işlemleri için filtrelenmiş query döndür
            return _dbSet.Where(x => !x.IsDeleted);
        }

        public async Task AddAsync(T entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
        }

        public async Task UpdateAsync(T entity, string? updatedBy = null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = updatedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(T entity, string? deletedBy = null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
