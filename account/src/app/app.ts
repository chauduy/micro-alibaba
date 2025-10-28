import { Component, effect, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { UserStore } from './store/user.store';
import { FavoriteStore } from './store/favorite.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Loading } from './components/loading/loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    Loading,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isCollapsed = false;
  isMobile = false;
  favoriteList;

  constructor(private userStore: UserStore, private favoriteStore: FavoriteStore) {
    this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
    effect(() => {
      const user = this.userStore.user$;
      user.subscribe((u) => {
        if (u?.uid) {
          this.favoriteStore.loadFavoriteList(u.uid);
        }
      });
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  async ngOnInit() {
    this.onResize();
    await this.userStore.loadUser();
  }

  getSidebarWidth(): number {
    if (this.isCollapsed) {
      return this.isMobile ? 0 : 80;
    }
    return 256;
  }
}
