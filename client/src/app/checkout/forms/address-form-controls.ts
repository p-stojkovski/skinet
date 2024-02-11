import { Validators } from '@angular/forms';

export interface AddressFormStructure {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const addressFormControlNames: AddressFormStructure = {
  firstName: 'firstName',
  lastName: 'lastName',
  street: 'street',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
};

export const addressFormControls: { [key: string]: any } = {
  [addressFormControlNames.firstName]: ['', Validators.required],
  [addressFormControlNames.lastName]: ['', Validators.required],
  [addressFormControlNames.street]: ['', Validators.required],
  [addressFormControlNames.city]: ['', Validators.required],
  [addressFormControlNames.state]: ['', Validators.required],
  [addressFormControlNames.zipCode]: ['', Validators.required],
};
