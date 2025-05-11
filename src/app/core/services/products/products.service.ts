import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, computed } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.prod";
import { Product, ProductResponse } from "../../models/products/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  // Signals
  private productsSignal = signal<Product[]>([]);
  public totalProducts = computed(() => this.productsSignal().length);

  constructor() {
    this.loadProducts();
  }

  // Get all products
  loadProducts() {
    return this.http.get<ProductResponse>(environment.apiUrl + 'product/getallproduct').pipe(
        map(res => res.data.filter(p => p.productImage && p.price))).subscribe({
        next: (filteredProducts) => this.productsSignal.set(filteredProducts),
        error: (err) => console.error("Error loading products:", err)
      });
  }

  // Get all products
  getProductsSignal() {
    return this.productsSignal.asReadonly();
  }

  // Add new Product
  addProduct(product: FormData): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'product/createproduct', product);
  }
}
