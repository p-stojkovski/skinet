using Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Basket;

public record GetCustomerBasketResponse
{
    [Required]
    public string Id { get; set; }
    public List<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();
    public int DeliveryMethodId { get; set; }
    public decimal ShippingPrice { get; set; }
}