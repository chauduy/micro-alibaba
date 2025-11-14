import { Product, Timestamp } from '../app/type';
import list from '../../product.json';

export const getOrderStatus = (date: Timestamp) => {
    const deliveryTime = new Date(date.seconds * 1000 + date.nanoseconds / 1e6);
    const present = new Date();
    if (deliveryTime.getTime() > present.getTime()) {
        return 'Delivering';
    } else {
        return 'Completed';
    }
};

export const convertToDate = (date: Timestamp) =>
    new Date(date.seconds * 1000 + date.nanoseconds / 1e6).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });

export const getAmount = (list: Product[]) => {
    return list!
        .reduce((acc, cur) => {
            if (cur.price.includes('-')) {
                const price = cur.price.split('-')[1];
                return acc + parseFloat(price) * (cur.quantity ?? 1);
            } else {
                const price = cur.price.split('$')[1];
                return acc + parseFloat(price) * (cur.quantity ?? 1);
            }
        }, 10)
        .toFixed(2);
    // shipping price included
};

export const getRelatedProducts = (id: number) => {
    let results = [];
    const findIndex = list.findIndex((item) => item.id === id);
    if (id >= list.length - 24) {
        results = list.slice(findIndex - 24, findIndex);
    } else {
        results = list.slice(findIndex + 1, findIndex + 25);
    }

    return results;
};

export const paging = (list: any, itemPerPage: number) => {
    const data: any = {};
    const length =
        list.length % itemPerPage === 0
            ? list.length / itemPerPage
            : Math.floor(list.length / itemPerPage) + 1;
    let current = 0;
    for (let i = 1; i <= length; i++) {
        data[i] = list.slice(current, current + itemPerPage);
        current += itemPerPage;
    }
    return {
        totalPage: length,
        data,
    };
};
