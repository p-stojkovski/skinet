import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { CheckoutFormGroupStructure, checkoutFormGroupNames } from '../../forms/models/checkout-form-control-names';
import { AddressFormStructure, addressFormControlNames } from '../../forms/models/address-form-control-names';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent {
  @Input() checkoutForm?: FormGroup;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  saveUserAddress(): void {
    const addressForm = this.addressForm;

    if (!addressForm) {
      return;
    }

    this.accountService.updateUserAddress(addressForm.value).subscribe({
      next: () => this.onSaveSuccess(addressForm),
    });
  }

  private onSaveSuccess(addressForm: AbstractControl): void {
    this.toastr.success('Address saved.');
    addressForm.reset(addressForm.value);
  }

  get addressForm(): AbstractControl | null {
    return this.checkoutForm?.get(checkoutFormGroupNames.addressForm) ?? null;
  }

  get formControlNames(): AddressFormStructure {
    return addressFormControlNames;
  }

  get checkoutFormGroupNames(): CheckoutFormGroupStructure {
    return checkoutFormGroupNames;
  }
}
