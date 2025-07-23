using MBVProject.Domain.Base;
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

        public async Task<T?> GetByIdAsync(Guid id, bool asNoTracking = true)
        {
            var query = _dbSet.Where(x => x.Id == id && !x.IsDeleted);
            if (asNoTracking) query = query.AsNoTracking();
            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(bool asNoTracking = true)
        {
            var query = _dbSet.Where(x => !x.IsDeleted);
            if (asNoTracking) query = query.AsNoTracking();
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> FindAsync(
            Expression<Func<T, bool>> predicate,
            bool asNoTracking = true)
        {
            var query = _dbSet.Where(x => !x.IsDeleted).Where(predicate);
            if (asNoTracking) query = query.AsNoTracking();
            return await query.ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.Where(x => !x.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<T> Query(bool asNoTracking = false, bool withDeleted = false)
        {
            var query = withDeleted ? _dbSet.AsQueryable() : _dbSet.Where(x => !x.IsDeleted);
            if (asNoTracking) query = query.AsNoTracking();
            return query;
        }

        public async Task AddAsync(T entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _dbSet.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities, string? createdBy = null)
        {
            var now = DateTime.UtcNow;
            foreach (var entity in entities)
            {
                entity.CreatedAt = now;
                entity.CreatedBy = createdBy;
            }
            await _dbSet.AddRangeAsync(entities);
        }

        public async Task UpdateAsync(T entity, string? updatedBy = null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = updatedBy;
            _dbSet.Update(entity);
        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities, string? updatedBy = null)
        {
            var now = DateTime.UtcNow;
            foreach (var entity in entities)
            {
                entity.UpdatedAt = now;
                entity.UpdatedBy = updatedBy;
            }
            _dbSet.UpdateRange(entities);
        }

        public async Task SoftDeleteAsync(T entity, string? deletedBy = null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
            _dbSet.Update(entity);
        }

        public async Task SoftDeleteRangeAsync(IEnumerable<T> entities, string? deletedBy = null)
        {
            var now = DateTime.UtcNow;
            foreach (var entity in entities)
            {
                entity.IsDeleted = true;
                entity.DeletedAt = now;
                entity.DeletedBy = deletedBy;
            }
            _dbSet.UpdateRange(entities);
        }

        public async Task HardDeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
        }

        public async Task HardDeleteRangeAsync(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public async Task<PagedResult<T>> GetPagedAsync(
            Expression<Func<T, bool>>? predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            int page = 1,
            int pageSize = 20,
            bool asNoTracking = true,
            bool withDeleted = false)
        {
            var query = Query(asNoTracking, withDeleted);
            if (predicate != null)
                query = query.Where(predicate);

            var totalCount = await query.CountAsync();

            if (orderBy != null)
                query = orderBy(query);

            var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedResult<T>
            {
                Items = items,
                TotalCount = totalCount,
                PageIndex = page,
                PageSize = pageSize
            };
        }

        public async Task<List<TResult>> SelectAsync<TResult>(
            Expression<Func<T, bool>>? predicate,
            Expression<Func<T, TResult>> selector,
            int? take = null,
            int? skip = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            bool asNoTracking = true,
            bool withDeleted = false)
        {
            var query = Query(asNoTracking, withDeleted);
            if (predicate != null)
                query = query.Where(predicate);

            if (orderBy != null)
                query = orderBy(query);

            if (skip.HasValue)
                query = query.Skip(skip.Value);

            if (take.HasValue)
                query = query.Take(take.Value);

            return await query.Select(selector).ToListAsync();
        }
    }
}