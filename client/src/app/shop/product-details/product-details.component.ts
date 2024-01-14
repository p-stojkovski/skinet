import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  breadcrumbAlias: string = '@productDetails';
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.bcService.set(this.breadcrumbAlias, ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.shopService.getProduct(+id).subscribe({
        next: (product) => {
          this.product = product;
          this.bcService.set(this.breadcrumbAlias, product.name);
          this.basketService.basketSource$.pipe(take(1)).subscribe({
            next: (basket) => {
              const item = basket?.items.find((x) => x.id === +id);
              if (!item) {
                return;
              }

              this.quantity = item.quantity;
              this.quantityInBasket = item.quantity;
            },
          });
        },
        error: (error) => console.log(error),
      });
    }
  }

  incrementQuantity(): void {
    this.quantity++;

    if (this.quantityInBasket > 0) {
      this.updateBasket();
    }
  }

  decrementQuantity(): void {
    if (this.quantity === 1) {
      this.removeFromBasket();
      return;
    }
    this.quantity--;

    if (this.quantityInBasket > 0) {
      this.updateBasket();
    }
  }

  updateBasket(): void {
    if (!this.product) {
      return;
    }

    if (this.quantity > this.quantityInBasket) {
      const itemsToAdd = this.quantity - this.quantityInBasket;
      this.quantityInBasket += itemsToAdd;

      this.basketService.addItemToBasket(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInBasket - this.quantity;
      this.quantityInBasket -= itemsToRemove;

      this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
    }
  }

  removeFromBasket(): void {
    if (!this.product) {
      return;
    }

    const confirmationTitle = 'Confirmation';
    const confirmationMessage =
      'Are you sure you want to remove ' + this.product.name + ' from cart?';

    this.confirmDialogService
      .open(confirmationTitle, confirmationMessage)
      .then(() => {
        if (!this.product) {
          return;
        }

        this.basketService.removeItemFromBasket(
          this.product.id,
          this.quantityInBasket
        );

        this.quantity = 1;
        this.quantityInBasket = 0;
      });
  }
}
