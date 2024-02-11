import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { addressFormControls } from './address-form-controls';
import { deliveryMethodFormControls } from './delivery-form-controls';
import { paymentFormControls } from './payment-form-controls';
import { Address } from 'src/app/shared/models/user';

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
