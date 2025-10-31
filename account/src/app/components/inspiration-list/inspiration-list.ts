import { Component, effect, signal } from '@angular/core';
import { FavoriteStore } from '../../store/favorite.store';
import { getRelatedProducts } from '../../../utils';
import { Product as ProductType } from '../../type';
import { CommonModule } from '@angular/common';
import { Product } from '../product/product';

@Component({
  selector: 'app-inspiration-list',
  imports: [CommonModule, Product],
  templateUrl: './inspiration-list.html',
  styleUrl: './inspiration-list.scss',
})
export class InspirationList {
  inspirationList = signal<ProductType[] | null>(null);

  constructor(private favoriteStore: FavoriteStore) {
    effect(() => {
      const temp = this.favoriteStore.favoriteList$;
      temp.subscribe((item) => {
        if (item) {
          this.inspirationList.set(getRelatedProducts(item[0].id));
        } else {
          this.favoriteStore.setList(getRelatedProducts(1));
        }
      });
    });
  }
}
