using MBVProject.Domain.Entities.Roles;
using MBVProject.Domain.Entities.Users;
using MBVProject.Domain.Interfaces;
using MBVProject.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MBVProject.Infrastructure.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<AppRole> _dbSet;

        public RoleRepository(AppDbContext context)
        {
            _context = context;
            _dbSet = _context.Set<AppRole>();
        }

        // IRepository<AppRole> zorunlu metotlar:

        public async Task<AppRole?> GetByIdAsync(Guid id)
        {
            return await _dbSet.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<AppRole>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<IEnumerable<AppRole>> FindAsync(Expression<Func<AppRole, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task<bool> AnyAsync(Expression<Func<AppRole, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        public IQueryable<AppRole> Query()
        {
            return _dbSet.AsQueryable();
        }

        public async Task AddAsync(AppRole entity, string? createdBy = null)
        {
            // createdBy loglanacaksa burada kullan
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(AppRole entity, string? updatedBy = null)
        {
            // updatedBy loglanacaksa burada kullan
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(AppRole entity, string? deletedBy = null)
        {
            // Eğer AppRole’de IsDeleted kolonu varsa:
            //if (entity is ISoftDeletable softEntity) // kendi interface’in varsa
            {
                entity.IsDeleted = true;
                // deletedBy loglama istersen burada kullan
                _dbSet.Update(entity);
                await _context.SaveChangesAsync();
            //}
            //else
            //{
            //    // SoftDelete yoksa HardDelete yapabilirsin
            //    _dbSet.Remove(entity);
            //    await _context.SaveChangesAsync();
            //}
        }
        }

        public async Task HardDeleteAsync(AppRole entity)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }

        // 👇 Aşağıdakiler Role’e özel metotlar
        public async Task<bool> AnyAsync(string roleName)
        {
            return await _dbSet.AnyAsync(r => r.Name == roleName);
        }

        public async Task<bool> AssignRoleAsync(Guid userId, Guid roleId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            var roleExists = await _dbSet.AnyAsync(r => r.Id == roleId);
            if (!userExists || !roleExists) return false;

            // Çift eklenmesini önlemek için kontrol:
            bool alreadyAssigned = await _context.UserRoles.AnyAsync(ur => ur.UserId == userId && ur.RoleId == roleId);
            if (alreadyAssigned) return true;

            await _context.UserRoles.AddAsync(new UserRole
            {
                UserId = userId,
                RoleId = roleId
            });
            await _context.SaveChangesAsync();
            return true;
        }
    }
}