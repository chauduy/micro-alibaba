import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTable } from '@app/components/custom-table/custom-table';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { OrderStore } from '@app/store/order.store';
import { CustomOrder } from '@app/type';
import { cellOrderColumns, headOrderColumns } from 'constants';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { paging } from 'utils';

@Component({
    selector: 'app-order',
    imports: [NzPaginationModule, CommonModule, InspirationList, CustomTable],
    templateUrl: './order.html',
    styleUrl: './order.scss',
})
export class Order {
    orders;
    currentPage = signal<number>(1);
    currentData = signal<CustomOrder[]>([]);
    pagingData = signal<{ totalPage: number; data: any } | null>(null);
    headColumns = headOrderColumns;
    cellColumns = cellOrderColumns;
    constructor(private orderStore: OrderStore, private router: Router) {
        this.orders = toSignal(this.orderStore.orderList$, { initialValue: null });

        effect(() => {
            const temp = this.orders();
            if (temp && temp.length > 0) {
                this.pagingData.set(paging(temp, 5));
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

    onView(id: string) {
        this.router.navigate(['/orders', id]);
    }
}
