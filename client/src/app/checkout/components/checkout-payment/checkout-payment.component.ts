import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../../services/checkout.service';
import { ToastrService } from 'ngx-toastr';
import { Basket } from 'src/app/shared/models/basket';
import { Address } from 'src/app/shared/models/user';
import { OrderToCreate } from 'src/app/shared/models/order';
import { NavigationExtras, Router } from '@angular/router';
import { deliveryMethodFormControlNames } from '../../forms/models/delivery-form-control-names';
import { checkoutFormGroupNames } from '../../forms/models/checkout-form-control-names';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss'],
})
export class CheckoutPaymentComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private basketService: BasketService,
    private checkoutService: CheckoutService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  submitOrder(): void {
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) {
      return;
    }

    const orderToCreate = this.getOrderToCreate(basket);
    if(!orderToCreate) {
      return;
    }

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        this.toastr.success('Order created successfully');
        this.basketService.deleteLocalBasket();
        const navigationExtras: NavigationExtras = {state: order};
        this.router.navigate(['checkout/success'], navigationExtras);
      }
    })
  }

  private getOrderToCreate(basket: Basket): OrderToCreate | undefined {
    const deliveryMethodId = this.deliveryForm?.get(deliveryMethodFormControlNames.deliveryMethod)?.value;
    const shipToAddress = this.addressForm?.value as Address;
    if(!deliveryMethodId || !shipToAddress) {
      return;
    }

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }

  get deliveryForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.deliveryForm) ?? null;
  }

  get addressForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.addressForm) ?? null;
  }
}
