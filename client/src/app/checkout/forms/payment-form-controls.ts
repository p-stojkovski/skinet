import { Validators } from '@angular/forms';

export interface PaymentFormStructure {
  nameOnCard: string;
}

export const paymentFormControlNames: PaymentFormStructure = {
  nameOnCard: 'nameOnCard',
};

export const paymentFormControls: { [key: string]: any } = {
  [paymentFormControlNames.nameOnCard]: ['', Validators.required],
};
