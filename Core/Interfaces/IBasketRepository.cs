using Core.Entities;

namespace Core.Interfaces;

public interface IBasketRepository
{
    Task<CustomerBasket> GetBasketAsync(string basketId);
    Task<CustomerBasket> SaveBasketAsync(CustomerBasket basket);
    Task<bool> DeleteBasketAsync(string basketId);
}
