import { Product } from '../products/product.model';

export interface FavorateProductsResponse {
  status: string;
  data: Product[];
}


export interface RemoveFavoriteResponse {
  status: string;
  message: string;
  data: string[];
}
