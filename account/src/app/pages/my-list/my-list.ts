import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem } from 'app/components/cart-item/cart-item';
import { FavoriteStore } from 'app/store/favorite.store';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-my-list',
  imports: [NzPaginationModule, CommonModule, CartItem],
  templateUrl: './my-list.html',
  styleUrl: './my-list.scss',
})
export class MyList {
  favoriteList;

  constructor(private favoriteStore: FavoriteStore) {
    this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
  }
}
