using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services;

public sealed class OrderService : IOrderService
{
    private readonly IBasketRepository _basketRepository;
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IBasketRepository basketRepository, IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
        _basketRepository = basketRepository;
    }

    //TODO: Extract out input params into separate object model
    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
        var basket = await _basketRepository.GetBasketAsync(basketId);

        //TODO: Extract out of the foreach loop getting of productItem
        var items = new List<OrderItem>();
        foreach (var item in basket.Items)
        {
            var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
            var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);

            items.Add(orderItem);
        }

        var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

        var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod);

        _unitOfWork.Repository<Order>().Add(order);

        var result = await _unitOfWork.Complete();
        if (result <= 0)
        {
            return null;
        }

        await _basketRepository.DeleteBasketAsync(basketId);

        return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<DeliveryMethod> GetDeliveryMethodByIdAsync(int id)
    {
        return await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(id);
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
         return await _unitOfWork
            .Repository<Order>()
            .GetEntityWithSpec(new OrdersWithItemsAndOrderingSpecification(id, buyerEmail));
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
        return await _unitOfWork
            .Repository<Order>()
            .ListAsync(new OrdersWithItemsAndOrderingSpecification(buyerEmail));
    }
}