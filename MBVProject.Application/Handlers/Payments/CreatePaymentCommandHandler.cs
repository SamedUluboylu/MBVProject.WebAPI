using MBVProject.Application.Commands.Payments;
using MBVProject.Domain.Entities.Payments;
using MBVProject.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.Handlers.Payments
{
    public class CreatePaymentCommandHandler : IRequestHandler<CreatePaymentCommand, Guid>
    {
        private readonly IPaymentRepository _paymentRepository;

        public CreatePaymentCommandHandler(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        public async Task<Guid> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
        {
            // Dilersen burada extra validasyonlar yapabilirsin
            if (request.Amount <= 0)
                throw new ArgumentException("Ödeme tutarı sıfırdan büyük olmalı.");

            if (string.IsNullOrWhiteSpace(request.PaymentMethod))
                throw new ArgumentException("Ödeme yöntemi belirtilmeli.");

            // Yeni Payment nesnesini oluştur
            var payment = new Payment
            {
                OrderId = request.OrderId,
                Amount = request.Amount,
                Currency = request.Currency,
                PaymentMethod = request.PaymentMethod,
                PaidAt = DateTime.UtcNow,
                Status = "Success", // Başarılı varsayıyoruz, istersen önce Pending yaparsın
                TransactionId = request.TransactionId,
                Note = request.Note
            };

            // Repository aracılığıyla veritabanına ekle
            await _paymentRepository.AddAsync(payment);

            // Oluşan Payment Id'yi döndür
            return payment.Id;
        }
    }
}
