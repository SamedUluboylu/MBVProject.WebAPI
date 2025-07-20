using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities
{
    public class Review : BaseEntity
    {
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public Guid OrderId { get; set; }
    }
}