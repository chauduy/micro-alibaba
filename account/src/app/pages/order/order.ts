import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTable } from '@app/components/custom-table/custom-table';
import { InspirationList } from '@app/components/inspiration-list/inspiration-list';
import { OrderStore } from '@app/store/order.store';
import { CustomOrder } from '@app/type';
import { cellOrderColumns, headOrderColumns } from 'constants';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

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
    pagingDate = signal<{ totalPage: number; data: any } | null>(null);
    headColumns = headOrderColumns;
    cellColumns = cellOrderColumns;
    constructor(private orderStore: OrderStore) {
        this.orders = toSignal(this.orderStore.orderList$, { initialValue: null });

        effect(() => {
            const temp = this.orders();
            if (temp && temp.length > 0) {
                const data: any = {};
                const length =
                    temp.length % 5 === 0 ? temp.length / 5 : Math.floor(temp.length / 5) + 1;
                let current = 0;
                for (let i = 1; i <= length; i++) {
                    data[i] = temp.slice(current, current + 5);
                    current += 5;
                }
                this.pagingDate.set({ totalPage: length, data });
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
        console.log('id', id);
    }
}
