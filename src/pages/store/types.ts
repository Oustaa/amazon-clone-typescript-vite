export interface StoreInterface {
  views: number[];
  _id: string;
  name: string;
  bg_image: string;
  avatar: string;
  bio: string;
  address: string;
  currency: string;
  email: string;
  email_verified: boolean;
  password: string;
  phone_number: string;
  phone_verified: boolean;
  followers: any[];
  visits: number[];
  updated_at: string;
  deleted_at: any;
  created_at: string;
  __v: number;
  location: Location;
  questions: Question[];
  updatedAt: string;
  orders: Order[];
}

export interface Location {
  lat: string;
  long: string;
}

export interface Question {
  product_id: string;
  text: string;
  user: string;
  _id: string;
}

export interface Order {
  items: any[];
  _id: string;
  item: any[];
}
