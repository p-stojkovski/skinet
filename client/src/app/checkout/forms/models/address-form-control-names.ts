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
