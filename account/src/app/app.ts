import { Component, effect, EventEmitter, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Loading } from './components/loading/loading';
import { UserStore } from './store/user.store';
import { FavoriteStore } from './store/favorite.store';
import { OrderStore } from './store/order.store';

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
export class App implements OnInit {
    isCollapsed = false;
    isMobile = false;
    favoriteList;
    orderList;
    user;

    constructor(
        private userStore: UserStore,
        private favoriteStore: FavoriteStore,
        private orderStore: OrderStore
    ) {
        this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
        this.orderList = toSignal(this.orderStore.orderList$, { initialValue: null });
        this.user = toSignal(this.userStore.user$, { initialValue: null });

        effect(() => {
            const u = this.user();
            if (u?.uid) {
                this.favoriteStore.loadFavoriteList(u.uid);
                this.orderStore.loadOrderList(u.uid);
            }
        });
    }

    async ngOnInit() {
        this.onResize();
        await this.userStore.loadUser();
    }

    @HostListener('window:resize')
    onResize() {
        this.isMobile = window.innerWidth < 768;
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    getSidebarWidth(): number {
        if (this.isCollapsed) {
            return this.isMobile ? 0 : 80;
        }
        return 256;
    }
}
