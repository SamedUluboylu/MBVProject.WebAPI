using MBVProject.Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Queries.Shipments
{
    public class GetShipmentByOrderIdQuery : IRequest<ShipmentDto>
    {
        public Guid OrderId { get; set; }
        public GetShipmentByOrderIdQuery(Guid orderId)
        {
            OrderId = orderId;
        }
    }
}
