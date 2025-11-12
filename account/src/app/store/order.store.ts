import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomOrder, Orders } from '../type';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { convertToDate, getAmount, getOrderStatus } from 'utils';

@Injectable({ providedIn: 'root' })
export class OrderStore {
    private readonly _orderList$ = new BehaviorSubject<CustomOrder[] | null>(null);
    readonly orderList$ = this._orderList$.asObservable();
    get orderList(): CustomOrder[] | null {
        return this._orderList$.value;
    }

    setList(list: CustomOrder[] | null) {
        this._orderList$.next(list);
    }

    async loadOrderList(uid: string) {
        try {
            const orderRef = collection(db, 'customers', uid, 'orders');
            const q = query(orderRef);
            const ordersSnap = await getDocs(q);
            if (ordersSnap) {
                const temp = ordersSnap.docs
                    .map((doc) => ({
                        ...(doc.data() as Orders),
                        id: doc.id,
                    }))
                    .map((item) => ({
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

                this._orderList$.next(temp);
            }
        } catch (error) {
            console.error(error);
            this._orderList$.next([]);
        }
    }
}
