using System.Net;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
        _mapper = mapper;
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
        var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

        var order = await _orderService.CreateOrderAsync(UserEmail, orderDto.DeliveryMethodId, orderDto.BasketId, address);

        if(order == null) return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Problem creating order"));

        return Ok(order);
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Order>>> GetOrdersForUser()
    {
        var orders = await _orderService.GetOrdersForUserAsync(UserEmail);

        return Ok(orders);
    } 

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderByIdForUser(int id)
    {
        var order = await _orderService.GetOrderByIdAsync(id, UserEmail);

        if(order is null) 
        {
            return NotFound(new ApiResponse((int)HttpStatusCode.NotFound));
        }

        return order;
    } 

    [HttpGet("delivery-methods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
        return Ok(await _orderService.GetDeliveryMethodsAsync());
    } 
}