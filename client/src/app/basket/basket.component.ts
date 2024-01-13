import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { BasketItem } from '../shared/models/basket';
import { ConfirmDialogService } from '../shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  constructor(
    public basketService: BasketService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  incrementQuantity(item: BasketItem): void {
    this.basketService.addItemToBasket(item);
  }

  decrementQuantity(item: BasketItem): void {
    if(item.quantity === 1) {
      this.showConfirmation(item);
      return;
    }

    this.basketService.removeItemFromBasket(item.id, 1);
  }

  removeItem(item: BasketItem): void {
    this.showConfirmation(item);
  }

  showConfirmation(item: BasketItem): void {
    const confirmationTitle = 'Confirmation';
    const confirmationMessage =
      'Are you sure you want to remove ' + item.productName + ' from cart?';

    this.confirmDialogService
      .open(confirmationTitle, confirmationMessage)
      .then(() => {
        this.basketService.removeItemFromBasket(item.id, item.quantity);
      })
      .catch(() => {
        console.log('Cancelled!');
      });
  }
}
