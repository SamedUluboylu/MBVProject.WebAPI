using MBVProject.Application.Common.Models;
using MBVProject.Domain.Entities;
using MBVProject.Domain.Enums;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MBVProject.Application.Public.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Result<Guid>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrderCommandHandler(
            IOrderRepository orderRepository,
            IProductRepository productRepository,
            IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Result<Guid>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            if (!request.Items.Any())
            {
                return Result<Guid>.FailureResult("Order must contain at least one item");
            }

            var order = new Order
            {
                OrderNumber = GenerateOrderNumber(),
                UserId = request.UserId,
                ShippingAddress = request.ShippingAddress,
                BillingAddress = request.BillingAddress,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                CustomerNote = request.CustomerNote,
                CouponCode = request.CouponCode,
                Status = OrderStatus.Pending
            };

            foreach (var item in request.Items)
            {
                var product = await _productRepository.GetByIdAsync(item.ProductId);
                if (product == null)
                {
                    return Result<Guid>.FailureResult($"Product with ID {item.ProductId} not found");
                }

                if (product.Status != ProductStatus.Active)
                {
                    return Result<Guid>.FailureResult($"Product {product.Name} is not available");
                }

                if (product.StockQuantity < item.Quantity && !product.AllowBackorder)
                {
                    return Result<Guid>.FailureResult($"Insufficient stock for product {product.Name}");
                }

                var orderItem = new OrderItem
                {
                    ProductId = item.ProductId,
                    VariantId = item.VariantId,
                    ProductName = product.Name,
                    ProductSku = product.Sku,
                    Quantity = item.Quantity,
                    UnitPrice = product.Price,
                    DiscountAmount = 0,
                    TaxAmount = 0
                };

                order.Items.Add(orderItem);
            }

            order.CalculateTotals();

            await _orderRepository.AddAsync(order);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return Result<Guid>.SuccessResult(order.Id, "Order created successfully");
        }

        private string GenerateOrderNumber()
        {
            return $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString("N").Substring(0, 6).ToUpper()}";
        }
    }
}
