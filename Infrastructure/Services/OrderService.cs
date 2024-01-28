using System.Security.AccessControl;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Services;
public class OrderService : IOrderService
{
    private readonly IGenericRepository<Order> _orderRepository;
    private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepository;
    private readonly IGenericRepository<Product> _productRepository;
    private readonly IBasketRepository _basketRepository;

    public OrderService(IGenericRepository<Order> orderRepository, IGenericRepository<DeliveryMethod> deliveryMethodRepository,
    IGenericRepository<Product> productRepository, IBasketRepository basketRepository)
    {
        _orderRepository = orderRepository;
        _deliveryMethodRepository = deliveryMethodRepository;
        _productRepository = productRepository;
        _basketRepository = basketRepository;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
        // get basket from the repo
        var basket = await _basketRepository.GetBasketAsync(basketId);

        // get items from the product repo
        var items = new List<OrderItem>();
        foreach (var item in basket.Items)
        {
            var productItem = await _productRepository.GetByIdAsync(item.Id);
            var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);

            items.Add(orderItem);
        }

        // get delivery method from repo
        var deliveryMethod = await _deliveryMethodRepository.GetByIdAsync(deliveryMethodId);

        // calculate subtotal
        var subtotal = items.Sum(item => item.Price * item.Quantity);

        // create order
        var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);

        //TODO: save to db

        return order;
    }

    public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
        throw new NotImplementedException();
    }
}