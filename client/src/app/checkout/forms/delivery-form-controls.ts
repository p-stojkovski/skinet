import { Validators } from '@angular/forms';
import { deliveryMethodFormControlNames } from './models/delivery-form-control-names';

export const deliveryMethodFormControls: { [key: string]: any } = {
  [deliveryMethodFormControlNames.deliveryMethod]: ['', Validators.required],
};
