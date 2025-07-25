﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Commands.Products
{
    public class DeleteProductCommand : IRequest<bool>
    {
        public Guid Id { get; set; }
        public DeleteProductCommand(Guid id) => Id = id;
    }
}
