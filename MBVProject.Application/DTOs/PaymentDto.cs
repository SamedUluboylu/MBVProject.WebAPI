using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Application.DTOs
{
    public class PaymentDto
    {
        public Guid Id { get; set; }             // Payment Id
        public Guid OrderId { get; set; }        // İlgili siparişin Id'si
        public decimal Amount { get; set; }      // Ödeme tutarı
        public string Currency { get; set; } = "TRY"; // Para birimi
        public string PaymentMethod { get; set; } = string.Empty; // Ödeme yöntemi
        public string Status { get; set; } = string.Empty;        // Ödeme durumu
        public DateTime PaidAt { get; set; }     // Ödemenin gerçekleştiği zaman
        public string? TransactionId { get; set; } // Banka/sağlayıcı referansı
        public string? Note { get; set; }        // Açıklama veya not
    }
}
