using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Coupon
{
    public class GetAllCouponsQuery : IRequest<List<CouponDto>> { }

    public class GetCouponByIdQuery : IRequest<CouponDto>
    {
        public Guid Id { get; set; }
        public GetCouponByIdQuery(Guid id) => Id = id;
    }
}
