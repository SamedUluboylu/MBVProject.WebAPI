using MBVProject.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MBVProject.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Orders");

            builder.HasKey(o => o.Id);

            builder.Property(o => o.OrderNumber)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(o => o.OrderNumber)
                .IsUnique();

            builder.Property(o => o.CustomerEmail)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(o => o.CustomerPhone)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(o => o.SubtotalAmount)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.ShippingAmount)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.TaxAmount)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.DiscountAmount)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");

            builder.HasMany(o => o.Items)
                .WithOne(i => i.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(o => o.Payment)
                .WithOne(p => p.Order)
                .HasForeignKey<Domain.Entities.Orders.Payment>(p => p.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(o => o.Shipment)
                .WithOne(s => s.Order)
                .HasForeignKey<Domain.Entities.Orders.Shipment>(s => s.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(o => o.UserId);
            builder.HasIndex(o => o.Status);
            builder.HasIndex(o => o.CreatedAt);
        }
    }

    public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder.ToTable("OrderItems");

            builder.HasKey(oi => oi.Id);

            builder.Property(oi => oi.ProductName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(oi => oi.DiscountAmount)
                .HasColumnType("decimal(18,2)");

            builder.Property(oi => oi.TaxAmount)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(oi => oi.Product)
                .WithMany()
                .HasForeignKey(oi => oi.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
