import { Validators } from '@angular/forms';
import { addressFormControlNames } from './models/address-form-control-names';

export const addressFormControls: { [key: string]: any } = {
  [addressFormControlNames.firstName]: ['', Validators.required],
  [addressFormControlNames.lastName]: ['', Validators.required],
  [addressFormControlNames.street]: ['', Validators.required],
  [addressFormControlNames.city]: ['', Validators.required],
  [addressFormControlNames.state]: ['', Validators.required],
  [addressFormControlNames.zipCode]: ['', Validators.required],
};
