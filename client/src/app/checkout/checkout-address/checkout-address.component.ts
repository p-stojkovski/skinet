import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';

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
    return this.checkoutForm?.get('addressForm') ?? null;
  }
}
