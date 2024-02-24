using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;
    private readonly IOrderService _orderService;
    
    private readonly IMapper _mapper;

    public BasketController(IBasketRepository basketRepository, IMapper mapper, IOrderService orderService)
    {
        _mapper = mapper;
        _basketRepository = basketRepository;
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
    {
        var basket = await _basketRepository.GetBasketAsync(id);

        return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> SaveBasket(CustomerBasketDto basket)
    {
        var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);
        
        var deliveryMethod = await _orderService.GetDeliveryMethodByIdAsync(basket.DeliveryMethodId);
        
        if (deliveryMethod is not null) {
            customerBasket.ShippingPrice = deliveryMethod.Price;
        }

        var savedBasket = await _basketRepository.SaveBasketAsync(customerBasket);

        return Ok(savedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasketAsync(string id)
    {
        await _basketRepository.DeleteBasketAsync(id);
    }
}
