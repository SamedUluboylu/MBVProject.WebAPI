using MBVProject.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<T?> GetByIdAsync(Guid id, bool asNoTracking = true);

        Task<IEnumerable<T>> GetAllAsync(bool asNoTracking = true);

        Task<IEnumerable<T>> FindAsync(
            Expression<Func<T, bool>> predicate,
            bool asNoTracking = true);

        Task<bool> AnyAsync(Expression<Func<T, bool>> predicate);

        IQueryable<T> Query(bool asNoTracking = false, bool withDeleted = false);

        Task AddAsync(T entity, string? createdBy = null);
        Task AddRangeAsync(IEnumerable<T> entities, string? createdBy = null);

        Task UpdateAsync(T entity, string? updatedBy = null);
        Task UpdateRangeAsync(IEnumerable<T> entities, string? updatedBy = null);

        Task SoftDeleteAsync(T entity, string? deletedBy = null);
        Task SoftDeleteRangeAsync(IEnumerable<T> entities, string? deletedBy = null);

        Task HardDeleteAsync(T entity);
        Task HardDeleteRangeAsync(IEnumerable<T> entities);

        // Sayfalama & geliþmiþ filtre
        Task<PagedResult<T>> GetPagedAsync(
            Expression<Func<T, bool>>? predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            int page = 1,
            int pageSize = 20,
            bool asNoTracking = true,
            bool withDeleted = false);

        // Projection ile select/map
        Task<List<TResult>> SelectAsync<TResult>(
            Expression<Func<T, bool>>? predicate,
            Expression<Func<T, TResult>> selector,
            int? take = null,
            int? skip = null,
            Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
            bool asNoTracking = true,
            bool withDeleted = false);
    }
}