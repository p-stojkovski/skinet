import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BasketItem } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent {
  @Output() incrementQuantity = new EventEmitter<BasketItem>();
  @Output() decrementQuantity = new EventEmitter<BasketItem>();
  @Output() removeItem = new EventEmitter<BasketItem>();
  @Input() isBasket = true;

  constructor(public basketService: BasketService) {}

  incrementBasketItemQuantity(item: BasketItem) {
    this.incrementQuantity.emit(item);
  }

  decrementBasketItemQuantity(item: BasketItem) {
    this.decrementQuantity.emit(item);
  }

  removeBasketItem(item: BasketItem) {
    this.removeItem.emit(item);
  }
}
