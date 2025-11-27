import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem } from '@app/components/cart-item/cart-item';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { FavoriteStore } from '@app/store/favorite.store';
import { UserStore } from '@app/store/user.store';
import { Product } from '@app/type';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { paging } from 'utils';

@Component({
    selector: 'app-my-list',
    standalone: true,
    imports: [NzPaginationModule, CommonModule, CartItem, InspirationList],
    templateUrl: './my-list.html',
    styleUrl: './my-list.scss',
})
export class MyList {
    favoriteList;
    user;
    pagingData = signal<{ totalPage: number; data: any } | null>(null);
    currentPage = signal<number>(1);
    currentData = signal<Product[]>([]);

    constructor(private favoriteStore: FavoriteStore, private userStore: UserStore) {
        this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
        this.user = toSignal(this.userStore.user$, { initialValue: null });
        effect(() => {
            const temp = this.favoriteList();
            if (temp && temp.length > 0) {
                this.pagingData.set(paging(temp, 3));
            } else {
                this.pagingData.set(null);
                this.currentData.set([]);
            }
        });

        effect(() => {
            const page = this.currentPage();
            const pagingData = this.pagingData();
            const topPoint = document.getElementById('top-point');
            if (pagingData && pagingData.data) {
                const pageData = pagingData.data[page];
                if (pageData) {
                    this.currentData.set(pageData);
                }
            }
            if (topPoint) {
                topPoint.scrollIntoView({ behavior: 'instant' });
            }
        });
    }

    onChangePage(page: number) {
        this.currentPage.set(page);
    }

    onRemoveFromList(id: number) {
        const user = this.user();
        if (user) {
            this.favoriteStore.removeFromList(id, user.uid);
        }
    }
}
