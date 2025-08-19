interface ProductPreview {
    id: number;
    imageSrc: string;
    minUnit: string;
    price: string;
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

export interface Category {
    id: number;
    categoryType: string;
    productList: Product[];
    productPreview: ProductPreview[];
    title: string;
}

export interface TabProps {
    id: string;
    text: string;
    selected: boolean;
    className?: string;
    setSelected: (text: string) => void;
}

export interface BannerProps {
    key: string;
    title: string;
    description: string;
}

export interface Timestamp {
    seconds: number;
    nanoseconds: number;
}
