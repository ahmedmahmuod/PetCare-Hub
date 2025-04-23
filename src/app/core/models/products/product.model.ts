export interface Product {
  _id: string;
  name: string;
  desc: string;
  quantity: number;
  price: number;
  discount: number;
  productImage: string;
  category: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  priceAfterDiscount: number;
  __v: number;
}

export interface ProductResponse {
  status: string;
  results: number;
  data: Product[];
}
