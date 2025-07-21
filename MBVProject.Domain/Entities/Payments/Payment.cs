using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MBVProject.Domain.Entities.Payments
{
    public class Payment : BaseEntity
    {
        // Ödemeyi hangi sipariş için yaptığımız
        public Guid OrderId { get; set; }

        // Ödeme tutarı
        public decimal Amount { get; set; }

        // Para birimi (opsiyonel ama tavsiye edilir)
        public string Currency { get; set; } = "TRY";

        // Kullanılan ödeme yöntemi (Kart, Havale, Kapıda Ödeme vs.)
        public string PaymentMethod { get; set; } = string.Empty;

        // Ödeme durumu (Başarılı, Bekliyor, Başarısız)
        public string Status { get; set; } = "Pending";

        // Ödemenin gerçekten işlendiği tarih/saat
        public DateTime PaidAt { get; set; } = DateTime.UtcNow;

        // (Opsiyonel) Banka veya işlem referans numarası
        public string? TransactionId { get; set; }

        // (Opsiyonel) Açıklama / not
        public string? Note { get; set; }
    }
}
