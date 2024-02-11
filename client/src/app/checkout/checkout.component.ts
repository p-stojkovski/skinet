import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AccountService } from '../account/account.service';
import { CheckoutFormService } from './checkout-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private checkoutFormService: CheckoutFormService
  ) {}

  ngOnInit(): void {
    this.getAddressFormValues();
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutFormService.patchAddressValue(address);
      },
    });
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
