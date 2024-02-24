import { Component, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss'],
})
export class OrderTotalsComponent {
  @Input() useOrderDescription?: boolean = true;
  @Input() subTotal?: number | null;
  @Input() shipping?: number | null;
  @Input() total?: number | null;

  constructor(private basketService: BasketService) {
    if(this.subTotal || this.shipping || this.total) {
      return;
    }
    
    this.basketService.basketTotalSource$.subscribe({
      next: (basketTotals) => {
        this.subTotal = basketTotals?.subTotal;
        this.shipping = basketTotals?.shipping;
        this.total = basketTotals?.total;
      },
    });
  }
}
