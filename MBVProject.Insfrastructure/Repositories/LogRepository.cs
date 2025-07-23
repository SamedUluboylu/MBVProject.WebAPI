using MBVProject.Domain.Base;
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
    public class LogRepository : Repository<LogEntry>, ILogRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<LogEntry> _dbSet;

        public LogRepository(AppDbContext context):base(context)
        {
            _context = context;
            _dbSet = _context.Set<LogEntry>();
        }
        public async Task<IEnumerable<LogEntry>> GetByLevelAsync(string level)
        {
            return await _dbSet.Where(l => l.Level == level).ToListAsync();
        }
    }
}