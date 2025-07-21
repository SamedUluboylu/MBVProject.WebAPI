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
    public class LogRepository : ILogRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<LogEntry> _dbSet;

        public LogRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<LogEntry>();
        }

        // IRepository<LogEntry> implementasyonları

        public async Task<LogEntry?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<IEnumerable<LogEntry>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<LogEntry>> FindAsync(Expression<Func<LogEntry, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<LogEntry, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        public IQueryable<LogEntry> Query()
        {
            return _dbSet.AsQueryable();
        }

        public async Task AddAsync(LogEntry entity, string? createdBy = null)
        {
            // createdBy loglamak istersen burada kullan
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(LogEntry entity, string? updatedBy = null)
        {
            // updatedBy loglamak istersen burada kullan
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(LogEntry entity, string? deletedBy = null)
        {
            // LogEntry genelde silinmez, ama BaseEntity’den türediği varsayılsın:
            if (entity is BaseEntity baseEntity)
            {
                baseEntity.IsDeleted = true;
                baseEntity.DeletedAt = DateTime.UtcNow;
                baseEntity.DeletedBy = deletedBy;
                _dbSet.Update(entity);
            }
            else
            {
                // BaseEntity değilse hard delete yap
                _dbSet.Remove(entity);
            }
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(LogEntry entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        // 🔥 ILogRepository için ek metod
        public async Task<IEnumerable<LogEntry>> GetByLevelAsync(string level)
        {
            return await _dbSet.Where(l => l.Level == level).ToListAsync();
        }
    }
}