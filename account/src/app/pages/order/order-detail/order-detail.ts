import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartItem } from '@app/components/cart-item/cart-item';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { OrderStore } from '@app/store/order.store';
import { CustomOrder, Product } from '@app/type';
import { Loading } from '@app/components/loading/loading';
import { OrderSummary } from '@app/components/order-summary/order-summary';
import { paging } from 'utils';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-order-detail',
    standalone: true,
    imports: [
        CommonModule,
        CartItem,
        InspirationList,
        Loading,
        OrderSummary,
        NzPaginationModule,
        NzIconModule,
    ],
    templateUrl: './order-detail.html',
    styleUrl: './order-detail.scss',
})
export class OrderDetail {
    orderId: string | null = null;
    orders;
    order = signal<CustomOrder | null>(null);
    loading = signal<boolean>(true);
    currentPage = signal<number>(1);
    pagingData = signal<any>(null);
    currentData = signal<Product[]>([]);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderStore: OrderStore
    ) {
        this.orderId = this.route.snapshot.paramMap.get('order_id');
        this.orders = toSignal(this.orderStore.orderList$, { initialValue: null });

        effect(() => {
            const orderList = this.orders();
            if (orderList !== null) {
                this.loading.set(false);
                if (this.orderId && orderList.length > 0) {
                    const foundOrder = orderList.find((o) => o.orderId === this.orderId);
                    if (foundOrder) {
                        this.order.set(foundOrder);
                    } else {
                        this.router.navigate(['/not-found'], { replaceUrl: true });
                    }
                } else if (orderList.length === 0 && this.orderId) {
                    this.router.navigate(['/not-found'], { replaceUrl: true });
                }
            } else if (orderList === null && this.orderId) {
                this.loading.set(true);
            }
        });

        effect(() => {
            const temp = this.order()?.list;
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
            if (page && pagingData?.data) {
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

    goToOrders() {
        this.router.navigate(['/orders']);
    }
}
