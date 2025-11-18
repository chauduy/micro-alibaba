import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomOrder } from '@app/type';
import { getAmount } from 'utils';

@Component({
    selector: 'app-order-summary',
    standalone: true,
    templateUrl: './order-summary.html',
    styleUrls: ['./order-summary.scss'],
})
export class OrderSummary implements OnChanges {
    @Input() orderInfo: CustomOrder | null = null;

    quantity: number = 0;
    subtotal: string = '';
    total: string = '0.00';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['orderInfo'] && this.orderInfo?.list) {
            this.quantity = this.orderInfo.list.reduce((acc, cur) => acc + (cur.quantity || 0), 0);
            this.subtotal = getAmount(this.orderInfo.list);
            this.total = (Number(this.subtotal) - 10).toFixed(2);
        }
    }
}
