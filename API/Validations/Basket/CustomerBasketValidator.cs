using Core.Entities;
using FluentValidation;

namespace API.Validations.Basket;

public class CustomerBasketValidator : AbstractValidator<CustomerBasket>
{
    public CustomerBasketValidator()
    {
        RuleFor(basket => basket.Id).NotEmpty().WithMessage("Id cannot be empty.");

        RuleFor(basket => basket.Items).NotEmpty().WithMessage("Basket must have at least one item.");

        RuleForEach(basket => basket.Items).SetValidator(new BasketItemValidator());
    }
}
