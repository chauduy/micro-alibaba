import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Orders } from '../type';
import { db } from '../../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class OrderStore {
  private readonly _orderList$ = new BehaviorSubject<Orders[] | null>(null);
  readonly orderList$ = this._orderList$.asObservable();
  get orderList(): Orders[] | null {
    return this._orderList$.value;
  }

  setList(list: Orders[] | null) {
    this._orderList$.next(list);
  }

  async loadOrderList(uid: string) {
    try {
      const orderRef = collection(db, 'customers', uid, 'orders');
      const q = query(orderRef);
      const ordersSnap = await getDocs(q);
      if (ordersSnap) {
        this._orderList$.next(
          ordersSnap.docs.map((doc) => ({
            ...(doc.data() as Orders),
            id: doc.id,
          }))
        );
      }
    } catch (error) {
      console.error(error);
      this._orderList$.next([]);
    }
  }
}
