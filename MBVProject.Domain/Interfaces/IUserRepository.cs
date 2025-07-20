using MBVProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByRefreshTokenAsync(string token);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
    }
}
