import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Type } from '../shared/models/type';
import { Brand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams: ShopParams;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number): void {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    this.resetPageNumber(params);
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId: number): void {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    this.resetPageNumber(params);
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(event: any): void {
    const params = this.shopService.getShopParams();
    params.sort = event.target.value;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(pageNumber: number) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== pageNumber) {
      params.pageNumber = pageNumber;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm?.nativeElement.value;
    this.resetPageNumber(params);
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
    }

    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    
    this.getProducts();
  }

  private resetPageNumber(shopParams: ShopParams) {
    shopParams.pageNumber = 1;
  }
}
