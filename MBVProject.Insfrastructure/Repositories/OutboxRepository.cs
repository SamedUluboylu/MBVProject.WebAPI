using MBVProject.Domain.Entities;
using MBVProject.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Infrastructure.Repositories
{
    public class OutboxRepository : IOutboxRepository
    {
        public Task AddAsync(OutboxMessage message)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OutboxMessage>> GetUnprocessedAsync()
        {
            throw new NotImplementedException();
        }

        public Task MarkAsFailedAsync(Guid id, string error)
        {
            throw new NotImplementedException();
        }

        public Task MarkAsProcessedAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
