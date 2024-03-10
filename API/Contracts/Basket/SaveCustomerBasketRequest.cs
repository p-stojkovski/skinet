using API.Dtos;
using System.ComponentModel.DataAnnotations;

namespace API.Contracts.Basket;

public record SaveCustomerBasketRequest
{
    [Required]
    public string Id { get; set; }
    public List<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();
    public int DeliveryMethodId { get; set; }
}