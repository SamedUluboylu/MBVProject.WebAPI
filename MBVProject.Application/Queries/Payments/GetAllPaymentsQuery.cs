using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Payments
{
    public class GetAllPaymentsQuery : IRequest<List<PaymentDto>> { }

    public class GetPaymentByIdQuery : IRequest<PaymentDto>
    {
        public Guid Id { get; set; }
        public GetPaymentByIdQuery(Guid id) => Id = id;
    }
}
