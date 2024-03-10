using Core.Entities;
using FluentValidation;

namespace API.Validations.Basket;

public class BasketItemValidator : AbstractValidator<BasketItem>
{
    public BasketItemValidator()
    {
        RuleFor(item => item.Id).GreaterThan(0).WithMessage("Id must be greater than 0.");

        RuleFor(item => item.ProductName).NotEmpty().WithMessage("Product name cannot be empty.");

        RuleFor(item => item.Price).GreaterThan(0.09m).WithMessage("Price must be greater than zero.");

        RuleFor(item => item.Quantity).GreaterThan(0).WithMessage("Quantity must be greater than 0.");

        RuleFor(item => item.PictureUrl)
            .Must(BeAValidUrl)
            .When(item => !string.IsNullOrEmpty(item.PictureUrl))
            .WithMessage("PictureUrl must be a valid URL.");

        RuleFor(item => item.Brand).NotEmpty().WithMessage("Brand cannot be empty.");

        RuleFor(item => item.Type).NotEmpty().WithMessage("Type cannot be empty.");
    }

    private bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var outUri) && (outUri.Scheme == Uri.UriSchemeHttp || outUri.Scheme == Uri.UriSchemeHttps);
    }
}
