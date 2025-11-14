import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzTabsModule, NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTable } from '../custom-table/custom-table';
import { CustomOrder } from '@app/type';
import { OrderStore } from '@app/store/order.store';
import { cellOrderColumns, headOrderColumns } from 'constants';

@Component({
    selector: 'app-order-preview',
    standalone: true,
    imports: [CommonModule, NzTabsModule, NzTableModule, CustomTable],
    templateUrl: './order-preview.html',
    styleUrl: './order-preview.scss',
})
export class OrderPreview {
    totalList;
    customList = signal<CustomOrder[] | null>(null);
    currentList = signal<CustomOrder[] | null>(null);
    currentType = signal<string>('All');
    headColumns = headOrderColumns;
    cellColumns = cellOrderColumns;

    constructor(private orderStore: OrderStore, private router: Router) {
        this.totalList = toSignal(this.orderStore.orderList$, { initialValue: null });

        effect(() => {
            const tempType = this.currentType();
            const tempList = this.totalList();
            if (tempType && tempList !== null) {
                if (tempType === 'All') {
                    this.currentList.set(tempList.slice(0, 3));
                } else {
                    const filtered = tempList
                        .filter((item) => item.status === tempType)
                        .slice(0, 3);
                    this.currentList.set(filtered);
                }
            }
        });
    }

    onChangeTab(event: NzTabChangeEvent) {
        const tabNames = ['All', 'Delivering', 'Completed'];
        const index = event.index ?? 0;
        const selectedTab = tabNames[index] || 'All';
        this.currentType.set(selectedTab);
    }

    getContent() {
        switch (this.currentType()) {
            case 'All':
                return `You haven't any orders yet.`;
            case 'Delivering':
                return `You don't have any orders on delivering.`;
            case 'Completed':
                return `You don't have any orders on complete.`;
            default:
                return '';
        }
    }

    onView(id: string) {
        this.router.navigate(['/orders', id]);
    }

    goToOrders() {
        this.router.navigate(['/orders']);
    }
}
