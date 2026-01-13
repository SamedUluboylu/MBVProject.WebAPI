using MBVProject.Application.Common.Models;
using MediatR;
using System;

namespace MBVProject.Application.Admin.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<Result>
    {
        public Guid Id { get; set; }

        public DeleteProductCommand(Guid id)
        {
            Id = id;
        }
    }
}
