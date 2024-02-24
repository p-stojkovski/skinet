import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { addressFormControls } from './address-form-controls';
import { deliveryMethodFormControls } from './delivery-form-controls';
import { paymentFormControls } from './payment-form-controls';
import { Address } from 'src/app/shared/models/user';
import { checkoutFormGroupNames } from './models/checkout-form-control-names';
import { deliveryMethodFormControlNames } from './models/delivery-form-control-names';

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

  patchDeliveryMethodValue(deliveryMethodId: number) {
    this.deliveryForm
      ?.get(deliveryMethodFormControlNames.deliveryMethod)
      ?.patchValue(deliveryMethodId.toString());
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
