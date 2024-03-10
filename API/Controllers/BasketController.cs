using API.Contracts.Basket;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetCustomerBasketResponse))]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GetCustomerBasketResponse>> GetBasketById(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Invalid basket id"));
        }

        var basket = await _basketRepository.GetBasketAsync(id);
        if (basket == null)
        {
            basket = new CustomerBasket(id);
        }

        return Ok(_mapper.Map<GetCustomerBasketResponse>(basket));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomerBasket))]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CustomerBasket>> SaveBasket(SaveCustomerBasketRequest basket)
    {
        if (basket is null)
        {
            return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Invalid basket request"));
        }

        var customerBasket = _mapper.Map<SaveCustomerBasketRequest, CustomerBasket>(basket);
        
        var deliveryMethod = await _orderService.GetDeliveryMethodByIdAsync(basket.DeliveryMethodId);   
        if (deliveryMethod is not null) {
            customerBasket.ShippingPrice = deliveryMethod.Price;
        }

        var savedBasket = await _basketRepository.SaveBasketAsync(customerBasket);

        return Ok(savedBasket);
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteBasketAsync(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
        {
            return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Invalid basket id request"));
        }

        await _basketRepository.DeleteBasketAsync(id);

        return Ok();
    }
}
