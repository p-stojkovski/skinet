import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, map } from 'rxjs';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.http
      .get<DeliveryMethod[]>(this.baseUrl + 'orders/delivery-methods')
      .pipe(
        map((dm) => {
          return dm.sort((first, next) => next.price - first.price);
        })
      );
  }
}
