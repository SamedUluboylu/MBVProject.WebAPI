using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
        public class LogEntry : BaseEntity
    {
            public DateTime Timestamp { get; set; } = DateTime.UtcNow;
            public string Level { get; set; } = "Info"; // Info, Error, Warning
            public string Message { get; set; } = string.Empty;
            public string? Exception { get; set; }
            public string? Path { get; set; }
            public string? UserId { get; set; }
            public string? Properties { get; set; } // JSON vs.
        }
    }
