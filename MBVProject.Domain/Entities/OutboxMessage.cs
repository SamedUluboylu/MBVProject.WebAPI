﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
    public class OutboxMessage : BaseEntity
    {
        public DateTime OccurredOn { get; set; } = DateTime.UtcNow;
        public string Type { get; set; } = string.Empty; // Event tipi: OrderCreated, ProductUpdated vs.
        public string Payload { get; set; } = string.Empty; // JSON
        public bool Processed { get; set; } = false;
        public DateTime? ProcessedOn { get; set; }
        public string? Error { get; set; }
    }
}
