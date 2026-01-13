using FluentValidation;

namespace MBVProject.Application.Admin.Products.Commands.CreateProduct
{
    public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Product name is required")
                .MaximumLength(200).WithMessage("Product name cannot exceed 200 characters");

            RuleFor(x => x.Slug)
                .NotEmpty().WithMessage("Slug is required")
                .MaximumLength(200).WithMessage("Slug cannot exceed 200 characters")
                .Matches(@"^[a-z0-9]+(?:-[a-z0-9]+)*$").WithMessage("Slug must be in valid format (lowercase, numbers, hyphens)");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required");

            RuleFor(x => x.Price)
                .GreaterThan(0).WithMessage("Price must be greater than 0");

            RuleFor(x => x.Cost)
                .GreaterThanOrEqualTo(0).WithMessage("Cost cannot be negative");

            RuleFor(x => x.StockQuantity)
                .GreaterThanOrEqualTo(0).WithMessage("Stock quantity cannot be negative");

            RuleFor(x => x.Sku)
                .NotEmpty().WithMessage("SKU is required")
                .MaximumLength(100).WithMessage("SKU cannot exceed 100 characters");

            RuleFor(x => x.CategoryId)
                .NotEmpty().WithMessage("Category is required");

            RuleFor(x => x.BrandId)
                .NotEmpty().WithMessage("Brand is required");

            RuleFor(x => x.Weight)
                .GreaterThan(0).WithMessage("Weight must be greater than 0");
        }
    }
}
