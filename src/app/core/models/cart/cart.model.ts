import { Product } from '../products/product.model';

export interface CartData {
  _id: string;
  cartItems: CartItem[] | [];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  totalPriceAfterDiscount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  _id: string;
}

export interface CartResponse {
  status: string;
  numOfCartItems: number;
  data: CartData;
}
