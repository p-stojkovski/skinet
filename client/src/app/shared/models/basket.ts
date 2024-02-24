import * as cuid from 'cuid';

export interface BasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface Basket {
  id: string;
  items: BasketItem[];
  deliveryMethodId?: number;
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = [];
}

export interface BasketTotals {
  shipping: number;
  subTotal: number;
  total: number;
}
