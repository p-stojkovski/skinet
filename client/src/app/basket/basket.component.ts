import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}

  incrementQuantity(item: BasketItem): void {
    this.basketService.addItemToBasket(item);
  }

  decrementQuantity(id: number): void {
    this.basketService.removeItemFromBasket(id, 1);
  }

  removeItem(item: BasketItem): void {
    this.basketService.removeItemFromBasket(item.id, item.quantity);
  }
}
