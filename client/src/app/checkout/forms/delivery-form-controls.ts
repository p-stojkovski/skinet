import { Validators } from '@angular/forms';

export interface DeliveryFormStructure {
  deliveryMethod: string;
}

export const deliveryMethodFormControlNames: DeliveryFormStructure = {
  deliveryMethod: 'deliveryMethod',
};

export const deliveryMethodFormControls: { [key: string]: any } = {
  [deliveryMethodFormControlNames.deliveryMethod]: ['', Validators.required],
};
