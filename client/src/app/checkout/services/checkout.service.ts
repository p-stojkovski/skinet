import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable, map } from 'rxjs';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { Order, OrderToCreate } from 'src/app/shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(order: OrderToCreate): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

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
