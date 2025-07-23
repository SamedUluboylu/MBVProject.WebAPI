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
    public class RoleRepository : Repository<AppRole>, IRoleRepository
    {
        private readonly AppDbContext _context;
        private readonly DbSet<AppRole> _dbSet;

        public RoleRepository(AppDbContext context):base(context)
        {
            _context = context;
            _dbSet = _context.Set<AppRole>();
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