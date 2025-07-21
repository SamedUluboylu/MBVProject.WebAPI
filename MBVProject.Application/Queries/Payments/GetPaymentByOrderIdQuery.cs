using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Payments
{
    public class GetPaymentByOrderIdQuery : IRequest<PaymentDto>
    {
        public Guid OrderId { get; set; }
        public GetPaymentByOrderIdQuery(Guid orderId)
        {
            OrderId = orderId;
        }
    }
}
