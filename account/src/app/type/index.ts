export interface User {
    country_id?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    google_login: boolean;
    phone_code?: string;
    phone_number?: string;
    token: string;
    uid: string;
    loginMethod: 'account' | 'google';
    display_name?: string;
}

export interface FavoriteProduct {
    id: number;
    imageSrc: string;
    minPerOrder: string;
    popularityScore?: string;
    hotSellingScore?: string;
    bestReviewScore?: string;
    price: string;
    quantity?: number;
    sold: number;
    star: number;
    subject: string;
}

export interface Product extends FavoriteProduct {}

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}

export interface Orders {
    delivery_time: Timestamp;
    list: Product[];
    orderId: string;
    order_time: Timestamp;
}

export interface CustomOrder {
    delivery_time: string;
    list: Product[];
    orderId: string;
    no: string;
    order_time: string;
    status: string;
    amount: string;
    status_style?: string;
    amount_style?: string;
    delivery_time_style?: string;
    order_time_style?: string;
    no_style?: string;
}
