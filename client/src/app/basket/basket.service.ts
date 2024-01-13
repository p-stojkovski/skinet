import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): Subscription {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: (basket) => { 
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    });
  }

  setBasket(basket: Basket): Subscription {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: (basket) => { 
        this.basketSource.next(basket);
        this.calculateTotals();
      },
    });
  }

  getCurrentBasketValue(): Basket | null {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1): void {
    const itemToAdd = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(
    items: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number
  ): BasketItem[] {
    const item = items.find((x) => x.id === itemToAdd.id);
    if (item) {
      item.quantity += quantity;
    } else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }

    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();

    localStorage.setItem('basket_id', basket.id);

    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType,
    };
  }

  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();

    if (!basket) {
      return;
    }

    const shipping = 0;
    const subTotal = basket.items.reduce(
      (prev, curr) => curr.price * curr.quantity + prev,
      0
    );
    const total = subTotal + shipping;

    this.basketTotalSource.next({ shipping, total, subTotal });
  }
}
