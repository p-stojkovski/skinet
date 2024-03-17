using Core.Entities;
using Core.Interfaces;
using Core.Messaging;
using FluentValidation;
using LanguageExt.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Application.Basket.Commands.SaveBasket;

internal sealed class SaveBasketCommandHandler : ICommandHandler<SaveBasketCommand, Result<CustomerBasket>>
{
    private readonly IBasketRepository _basketRepository;
    private readonly IOrderService _orderService;
    private readonly IValidator<SaveBasketCommand> _validator;

    public SaveBasketCommandHandler(IBasketRepository basketRepository, IOrderService orderService, IValidator<SaveBasketCommand> validator)
    {
        _basketRepository = basketRepository;
        _orderService = orderService;
        _validator = validator;
    }

    public async Task<Result<CustomerBasket>> Handle(SaveBasketCommand request, CancellationToken cancellationToken)
    {
        _validator.ValidateAndThrow(request);

        var customerBasket = request.CustomerBasket;

        //Get only the delivery method price
        var deliveryMethod = await _orderService.GetDeliveryMethodByIdAsync(customerBasket.DeliveryMethodId);
        if (deliveryMethod is not null)
        {
            customerBasket.ShippingPrice = deliveryMethod.Price;
        }

        return await _basketRepository.SaveBasketAsync(customerBasket);
    }
}
