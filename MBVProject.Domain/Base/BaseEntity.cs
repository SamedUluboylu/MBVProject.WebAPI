﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Base
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public string? UpdatedBy { get; set; }

        public DateTime? DeletedAt { get; set; } = DateTime.UtcNow;
        public string? DeletedBy { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}