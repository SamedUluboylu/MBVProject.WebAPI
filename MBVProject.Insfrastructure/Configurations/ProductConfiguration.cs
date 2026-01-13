using MBVProject.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MBVProject.Infrastructure.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Slug)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasIndex(p => p.Slug)
                .IsUnique();

            builder.Property(p => p.Sku)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasIndex(p => p.Sku)
                .IsUnique();

            builder.Property(p => p.Description)
                .IsRequired();

            builder.Property(p => p.ShortDescription)
                .HasMaxLength(500);

            builder.Property(p => p.Price)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.CompareAtPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.Cost)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.Weight)
                .HasColumnType("decimal(18,2)");

            builder.Property(p => p.AverageRating)
                .HasColumnType("decimal(3,2)");

            builder.HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(p => p.Brand)
                .WithMany()
                .HasForeignKey(p => p.BrandId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(p => p.Images)
                .WithOne(i => i.Product)
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.Variants)
                .WithOne(v => v.Product)
                .HasForeignKey(v => v.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(p => p.Reviews)
                .WithOne(r => r.Product)
                .HasForeignKey(r => r.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(p => p.Status);
            builder.HasIndex(p => p.IsFeatured);
            builder.HasIndex(p => p.CategoryId);
            builder.HasIndex(p => p.BrandId);
        }
    }
}
