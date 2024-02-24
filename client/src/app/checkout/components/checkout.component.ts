import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { CheckoutFormService } from '../forms/checkout-form.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private checkoutFormService: CheckoutFormService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutFormService.patchAddressValue(address);
      },
    });
  }

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket && basket.deliveryMethodId) {
      this.checkoutFormService.patchDeliveryMethodValue(
        basket.deliveryMethodId
      );
    }
  }

  get checkoutForm(): FormGroup | undefined {
    return this.checkoutFormService.checkoutForm;
  }

  get addressForm(): AbstractControl | null {
    return this.checkoutFormService.addressForm ?? null;
  }

  get deliveryForm(): AbstractControl | null {
    return this.checkoutFormService.deliveryForm ?? null;
  }
}
