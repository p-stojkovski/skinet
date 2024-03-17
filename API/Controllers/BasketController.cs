using API.Contracts.Basket;
using API.Dtos;
using API.Errors;
using API.Extenstions;
using API.Helpers;
using API.Validations.Basket;
using Application.Basket.Commands.SaveBasket;
using Ardalis.GuardClauses;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using LanguageExt.Common;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

public class BasketController : BaseApiController
{
    private readonly IBasketRepository _basketRepository;
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;
    private readonly ISender Mediator;

    public BasketController(IBasketRepository basketRepository, IMapper mapper, IOrderService orderService, ISender mediator) 
    {
        _mapper = mapper;
        _basketRepository = basketRepository;
        _orderService = orderService;
        Mediator = mediator;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetCustomerBasketResponse))]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GetCustomerBasketResponse>> GetBasketById(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Invalid basket id."));
        }

        var basket = await _basketRepository.GetBasketAsync(id);
        if (basket is null)
        {
            basket = new CustomerBasket(id);
        }

        return Ok(_mapper.Map<GetCustomerBasketResponse>(basket));
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CustomerBasket))]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CustomerBasket>> SaveBasket(SaveCustomerBasketRequest request)
    {
        var customerBasket = _mapper.Map<SaveCustomerBasketRequest, CustomerBasket>(request);

        var result = await Mediator.Send(new SaveBasketCommand(customerBasket));

        return result.ToActionResult();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteBasketAsync(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest, "Invalid basket id."));
        }

        await _basketRepository.DeleteBasketAsync(id);

        return Ok();
    }
}
