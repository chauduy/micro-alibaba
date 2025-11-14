import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/account' },
    {
        path: 'account',
        loadChildren: () => import('./pages/account/account.routes').then((m) => m.ACCOUNT_ROUTES),
    },
    {
        path: 'my-list',
        loadChildren: () => import('./pages/my-list/my-list.routes').then((m) => m.MY_LIST_ROUTES),
    },
    {
        path: 'orders',
        loadChildren: () => import('./pages/order/order.routes').then((m) => m.ORDER_ROUTES),
    },
    { path: 'not-found', component: NotFound },
    { path: '**', component: NotFound },
];
