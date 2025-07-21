using MBVProject.Domain.Entities;
using MBVProject.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
        public interface IUserRepository:IRepository<AppUser>
    {
            Task<AppUser?> GetByEmailAsync(string email);
            Task<AppUser?> GetByRefreshTokenAsync(string refreshToken);
    }
    }