export interface AccordionProps {
    id: number;
    title: string;
    children: Array<{ title: string; link: string }>;
}

export interface GoogleUser {
    display_name: string;
    email: string;
    phone_number: string;
    token: string;
    uid: string;
}

export interface Product {
    id: number;
    imageSrc: string;
    minPerOrder: string;
    popularityScore?: string;
    price: string;
    subject: string;
    hotSellingScore?: string;
    bestReviewScore?: string;
    isLast?: boolean;
    star: number;
    sold: number;
    quantity?: number;
}
