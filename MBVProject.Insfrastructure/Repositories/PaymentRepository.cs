using MBVProject.Domain.Entities.Payments;
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
    public class PaymentRepository : IPaymentRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<Payment> _dbSet;

        public PaymentRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<Payment>();
        }

        public async Task<Payment?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            return await _dbSet.Where(p => !p.IsDeleted).ToListAsync();
        }

        public async Task<IEnumerable<Payment>> FindAsync(System.Linq.Expressions.Expression<Func<Payment, bool>> predicate)
        {
            return await _dbSet.Where(p => !p.IsDeleted).Where(predicate).ToListAsync();
        }

        public async Task<bool> AnyAsync(System.Linq.Expressions.Expression<Func<Payment, bool>> predicate)
        {
            return await _dbSet.Where(p => !p.IsDeleted).AnyAsync(predicate);
        }

        public IQueryable<Payment> Query()
        {
            return _dbSet.Where(p => !p.IsDeleted);
        }

        public async Task AddAsync(Payment entity, string? createdBy = null)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.CreatedBy = createdBy;
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Payment entity, string? updatedBy = null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = updatedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(Payment entity, string? deletedBy = null)
        {
            entity.IsDeleted = true;
            entity.DeletedAt = DateTime.UtcNow;
            entity.DeletedBy = deletedBy;
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task HardDeleteAsync(Payment entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        // 🔥 Özel metotlar
        public async Task<Payment?> GetByOrderIdAsync(Guid orderId)
        {
            return await _dbSet.FirstOrDefaultAsync(p => p.OrderId == orderId && !p.IsDeleted);
        }

        public async Task<IEnumerable<Payment>> GetAllPaymentsAsync()
        {
            return await _dbSet.Where(p => !p.IsDeleted).ToListAsync();
        }
    }
}
