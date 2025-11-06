import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTabsModule, NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { toSignal } from '@angular/core/rxjs-interop';
import { CustomTable } from '../custom-table/custom-table';
import { CustomOrder } from '@app/type';
import { OrderStore } from '@app/store/order.store';
import { convertToDate, getAmount, getOrderStatus } from 'utils';

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
  headOrderColumns = ['No', 'Order time', 'Delivery time', 'Amount', 'Status', 'Action'];
  cellOrderColumns = ['no', 'order_time', 'delivery_time', 'amount', 'status', 'action'];

  constructor(private orderStore: OrderStore) {
    this.totalList = toSignal(this.orderStore.orderList$, { initialValue: null });

    effect(() => {
      const tempList = this.totalList();
      if (tempList && tempList.length > 0) {
        const mappedList = tempList.map((item) => ({
          ...item,
          id: item.orderId,
          no: item.orderId.split('-')[0],
          delivery_time: convertToDate(item.delivery_time),
          order_time: convertToDate(item.order_time),
          status: getOrderStatus(item.delivery_time),
          amount: `$${getAmount(item.list)}`,
          status_style:
            getOrderStatus(item.delivery_time) === 'Completed'
              ? 'text-green-600'
              : 'text-yellow-400',
          amount_style: 'font-bold',
        }));
        this.customList.set(mappedList);
        this.currentType.set('All');
      } else if (tempList !== null) {
        this.customList.set([]);
        this.currentList.set([]);
      }
    });

    effect(() => {
      const tempType = this.currentType();
      const tempList = this.customList();
      if (tempType && tempList !== null) {
        if (tempType === 'All') {
          this.currentList.set(tempList.slice(0, 3));
        } else {
          const filtered = tempList.filter((item) => item.status === tempType).slice(0, 3);
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
    // TODO: Navigate to detail or open a modal. For now, just log.
    console.log('View order', id);
  }
}
