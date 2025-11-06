import { Component, effect, signal } from '@angular/core';
import { Product as ProductType } from '@app/type';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FavoriteStore } from '@app/store/favorite.store';
import { getRelatedProducts } from 'utils';
import { Product } from '../product/product';

@Component({
  selector: 'app-inspiration-list',
  standalone: true,
  imports: [CommonModule, Product],
  templateUrl: './inspiration-list.html',
  styleUrl: './inspiration-list.scss',
})
export class InspirationList {
  inspirationList = signal<ProductType[] | null>(null);
  favoriteList;

  constructor(private favoriteStore: FavoriteStore) {
    this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });

    effect(() => {
      const item = this.favoriteList();
      if (item && item.length > 0) {
        this.inspirationList.set(getRelatedProducts(item[0].id));
      } else if (item === null) {
        // Initial load - set default
        this.inspirationList.set(getRelatedProducts(1));
      }
    });
  }
}
