import { Validators } from '@angular/forms';
import { paymentFormControlNames } from './models/payment-form-control-names';

export const paymentFormControls: { [key: string]: any } = {
  [paymentFormControlNames.nameOnCard]: ['', Validators.required],
};
