import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem } from '@app/components/cart-item/cart-item';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { FavoriteStore } from '@app/store/favorite.store';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
    selector: 'app-my-list',
    standalone: true,
    imports: [NzPaginationModule, CommonModule, CartItem, InspirationList],
    templateUrl: './my-list.html',
    styleUrl: './my-list.scss',
})
export class MyList {
    favoriteList;
    pagingDate = signal<{ totalPage: number; data: any } | null>(null);
    currentPage = signal<number>(1);
    currentData = signal<any[]>([]);

    constructor(private favoriteStore: FavoriteStore) {
        this.favoriteList = toSignal(this.favoriteStore.favoriteList$, { initialValue: null });
        effect(() => {
            const temp = this.favoriteList();
            if (temp && temp.length > 0) {
                const data: any = {};
                const length =
                    temp.length % 3 === 0 ? temp.length / 3 : Math.floor(temp.length / 3) + 1;
                let current = 0;
                for (let i = 1; i <= length; i++) {
                    data[i] = temp.slice(current, current + 3);
                    current += 3;
                }
                this.pagingDate.set({
                    totalPage: length,
                    data,
                });
                // Set initial page data
                if (this.currentPage() === 1 && data[1]) {
                    this.currentData.set(data[1]);
                }
            } else {
                this.pagingDate.set(null);
                this.currentData.set([]);
            }
        });

        effect(() => {
            const page = this.currentPage();
            const pagingData = this.pagingDate();
            if (pagingData && pagingData.data) {
                const pageData = pagingData.data[page];
                if (pageData) {
                    this.currentData.set(pageData);
                }
            }
        });
    }

    onChangePage(page: number) {
        this.currentPage.set(page);
    }

    onRemoveFromList(id: number) {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user) {
            this.favoriteStore.removeFromList(id, user.uid);
        }
    }
}
