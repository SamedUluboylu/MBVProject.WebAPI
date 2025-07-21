using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Coupon
{
    public class ApplyCouponCommand : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public string CouponCode { get; set; } = string.Empty;
    }
}
