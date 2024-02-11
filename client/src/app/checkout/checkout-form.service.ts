import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Address } from '../shared/models/user';
import { addressFormControls } from './form-settings/address-form-controls';
import { deliveryMethodFormControls } from './form-settings/delivery-form-controls';
import { paymentFormControls } from './form-settings/payment-form-controls';

@Injectable({
  providedIn: 'root',
})
export class CheckoutFormService {
  checkoutForm?: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm(): void {
    this.checkoutForm = this.fb.group({
      [checkoutFormGroupNames.addressForm]: this.fb.group(addressFormControls),
      [checkoutFormGroupNames.deliveryForm]: this.fb.group(
        deliveryMethodFormControls
      ),
      [checkoutFormGroupNames.paymentForm]: this.fb.group(paymentFormControls),
    });
  }

  patchAddressValue(address: Address) {
    this.addressForm?.patchValue(address);
  }

  get form(): FormGroup {
    return this.checkoutForm as FormGroup;
  }

  get addressForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.addressForm) || null;
  }

  get deliveryForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.deliveryForm) || null;
  }

  get paymentForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.paymentForm) || null;
  }
}

export interface CheckoutFormGroupStructure {
  addressForm: string;
  deliveryForm: string;
  paymentForm: string;
}

export const checkoutFormGroupNames: CheckoutFormGroupStructure = {
  addressForm: 'addressForm',
  deliveryForm: 'deliveryForm',
  paymentForm: 'paymentForm',
};
