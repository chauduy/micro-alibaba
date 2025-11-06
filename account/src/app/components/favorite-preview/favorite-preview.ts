import { Component, HostListener } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Product } from '../product/product';
import { FavoriteStore } from '@app/store/favorite.store';

@Component({
  selector: 'app-favorite-preview',
  standalone: true,
  imports: [Product, CommonModule],
  templateUrl: './favorite-preview.html',
  styleUrl: './favorite-preview.scss',
})
export class FavoritePreview {
  list;
  isDesktop = false;

  constructor(private favoriteStore: FavoriteStore) {
    this.list = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth > 1024;
  }

  ngOnInit() {
    this.onResize();
  }
}
