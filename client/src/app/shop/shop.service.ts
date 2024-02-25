import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { Observable, map, of } from 'rxjs';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean = true): Observable<Pagination<Product[]>> {
    if (!useCache) {
      this.productCache = new Map();
    }

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(
          Object.values(this.shopParams).join('-')
        );

        if (this.pagination) {
          return of(this.pagination);
        }
      }
    }

    let params = new HttpParams();
    const shopParams = this.shopParams;

    if (shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId);
    }

    if (shopParams.typeId > 0) {
      params = params.append('typeId', shopParams.typeId);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageNumber', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    return this.http
      .get<Pagination<Product[]>>(this.baseUrl + 'products', {
        params,
      })
      .pipe(
        map((response) => {
          this.productCache.set(
            Object.values(this.shopParams).join('-'),
            response
          );
          this.pagination = response;

          return response;
        })
      );
  }

  setShopParams(params: ShopParams): void {
    this.shopParams = params;
  }

  getShopParams(): ShopParams {
    return this.shopParams;
  }

  getProduct(id: number): Observable<Product> {
    const product = [...this.productCache.values()].reduce(
      (acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      },
      {} as Product
    );

    if (Object.keys(product).length !== 0) {
      return of(product);
    }

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands(): Observable<Brand[]> {
    if (this.brands.length > 0) {
      return of(this.brands);
    }

    return this.http.get<Brand[]>(this.baseUrl + 'products/brands').pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes(): Observable<Type[]> {
    if (this.types.length > 0) {
      return of(this.types);
    }

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map((response) => {
        this.types = response;
        return response;
      })
    );
  }
}
