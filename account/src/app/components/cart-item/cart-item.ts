import { Component, Input } from '@angular/core';
import data from '../../../../data.json';
import { CommonModule } from '@angular/common';
import { Product } from '@app/type';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  @Input() product: Product | null = null;
  @Input() isLast: boolean = false;
  getCategoryName() {
    let findCategory;
    data.forEach((item) => {
      if (item.productList.some((prod) => prod.id === this.product?.id)) {
        findCategory = item.title;
      }
    });

    return findCategory;
  }
}
