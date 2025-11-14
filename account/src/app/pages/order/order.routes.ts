import { Routes } from '@angular/router';
import { Order } from './order';
import { OrderDetail } from './order-detail/order-detail';

export const ORDER_ROUTES: Routes = [
    { path: '', component: Order },
    {
        path: ':order_id',
        component: OrderDetail,
    },
];
