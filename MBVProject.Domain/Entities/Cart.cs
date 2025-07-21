using System;
using System.Collections.Generic;

namespace MBVProject.Domain.Entities
{
    public class Cart : BaseEntity
    {
        public Guid UserId { get; set; }
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();

        // Opsiyonel: Sepet toplam tutarı, kolaylık için
        public decimal TotalAmount => CalculateTotalAmount();

        private decimal CalculateTotalAmount()
        {
            decimal total = 0m;
            foreach (var item in Items)
            {
                total += item.UnitPrice * item.Quantity;
            }
            return total;
        }
    }

    public class CartItem : BaseEntity
    {
        public Guid CartId { get; set; }
        public Cart Cart { get; set; } = null!;

        public Guid ProductId { get; set; }
        public int Quantity { get; set; }

        public decimal UnitPrice { get; set; }  // Ürün birim fiyatı
        public decimal Discount { get; set; } = 0m; // İndirim varsa

        // İndirimli fiyat hesaplama (örn. kampanya)
        public decimal GetEffectivePrice() => (UnitPrice - Discount) * Quantity;
    }
}
