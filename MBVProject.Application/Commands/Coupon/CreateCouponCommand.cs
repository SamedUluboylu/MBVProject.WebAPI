using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Coupon
{
    public class CreateCouponCommand : IRequest<Guid>
    {
        public string Code { get; set; } = string.Empty;
        public decimal DiscountAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}