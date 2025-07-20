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
    public class LogRepository : ILogRepository
    {
        private readonly AppDbContext _context;

        public LogRepository(AppDbContext context)
        {
            _context = context;
        }

        // IRepository<LogEntry> implementasyonları

        public async Task AddAsync(LogEntry entity, string? createdBy = null)
        {
            await _context.Logs.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<LogEntry>> GetAllAsync()
        {
            return await _context.Logs.ToListAsync();
        }

        public async Task<LogEntry?> GetByIdAsync(Guid id)
        {
            return await _context.Logs.FindAsync(id);
        }

        public async Task UpdateAsync(LogEntry entity, string? updatedBy = null)
        {
            _context.Logs.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(LogEntry entity, string? deletedBy = null)
        {
            // Eğer LogEntry BaseEntity’den türemiyorsa soft delete yoksa direkt sil
            _context.Logs.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(LogEntry entity)
        {
            _context.Logs.Remove(entity);
            await _context.SaveChangesAsync();
        }

        // 🔥 ILogRepository için ek metod
        public async Task<IEnumerable<LogEntry>> GetByLevelAsync(string level)
        {
            return await _context.Logs
                .Where(l => l.Level == level)
                .ToListAsync();
        }
    }
}