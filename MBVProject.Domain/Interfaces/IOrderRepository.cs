using MBVProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface IOrderRepository:IRepository<Order>
    {
        Task<IEnumerable<Order>> GetByUserIdAsync(Guid userId);
    }
}
