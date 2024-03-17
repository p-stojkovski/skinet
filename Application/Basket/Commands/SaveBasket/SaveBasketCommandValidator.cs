using Core.Entities;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Basket.Commands.SaveBasket;

public sealed class SaveBasketCommandValidator : AbstractValidator<SaveBasketCommand>
{
    //move errors to ValidationErrors
    public SaveBasketCommandValidator()
    {
        RuleFor(x => x.CustomerBasket.Id).NotEmpty().WithMessage("Id cannot be empty.");

        RuleFor(x => x.CustomerBasket.Items).NotEmpty().WithMessage("Basket must have at least one item.");

        RuleForEach(x => x.CustomerBasket.Items).SetValidator(new BasketItemValidator());
    }
}

public sealed class BasketItemValidator : AbstractValidator<BasketItem>
{
    //move errors to ValidationErrors
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
