import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';

import { BasketService } from 'src/app/basket/basket.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss'],
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm?: FormGroup;

  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => (this.deliveryMethods = dm),
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethod): void {
    this.basketService.setShippingPrice(deliveryMethod);
  }

  get deliveryForm(): AbstractControl | null {
    return this.checkoutForm?.get('deliveryForm') ?? null;
  }
}
