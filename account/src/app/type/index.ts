export interface User {
  country_id: string;
  email: string;
  first_name: string;
  last_name: string;
  google_login: boolean;
  phone_code: string;
  phone_number: string;
  token: string;
  uid: string;
  loginMethod?: 'account' | 'google';
}

export interface FavoriteProduct {
  id: number;
  imageSrc: string;
  minPerOrder: string;
  popularityScore?: string;
  hotSellingScore?: string;
  bestReviewScore?: string;
  price: string;
  quantity: number;
  sold: number;
  star: number;
  subject: string;
}
