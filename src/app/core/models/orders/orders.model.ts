export interface OrderResponse {
  results: number;
  data: Order[];
}

export interface Order {
  _id: string;
  user: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaidAndDelivered: boolean;
  paidAndDeliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CartItem {
  _id: string;
  product: string;
  quantity: number;
  price: number;
}
