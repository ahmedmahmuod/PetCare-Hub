import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.prod";
import { Product, ProductResponse } from "../../models/products/product.model";

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    private http = inject(HttpClient);

    // Get all products
    getProducts(): Observable<Product[]> {
        return this.http.get<ProductResponse>(environment.apiUrl + 'product/getallproduct').pipe(map((res) => res.data.filter((res) => res.productImage && res.price)))
    }
}