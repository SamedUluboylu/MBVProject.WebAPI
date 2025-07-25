﻿using MBVProject.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Interfaces
{
    public interface ILogRepository:IRepository<LogEntry>
    {
        Task<IEnumerable<LogEntry>> GetByLevelAsync(string level);
    }
}
