import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { FavorateProductsResponse, RemoveFavoriteResponse } from '../../models/favorate/favorate.model';
import { Product } from '../../models/products/product.model';

@Injectable({
    providedIn: 'root',
  })
  export class FavoratesService {
    private http = inject(HttpClient);
  
    private bs = new BehaviorSubject<Product[]>([]);
    favorites$ = this.bs.asObservable(); 
  
    // get my favorates from the server and update the local state
    fetchFavorites(): Observable<Product[]> {
      return this.http.get<FavorateProductsResponse>(environment.apiUrl + `fav/getfavproduct`)
        .pipe(map((res) => {
          const products = res.data;
          this.bs.next(products);
          return products;
        }));
    }
  
    // Add or remove then update the local state
    addAndDeleteFav(productId: string): Observable<RemoveFavoriteResponse> {
        return this.http.patch<RemoveFavoriteResponse>(environment.apiUrl + `fav/addfav?productId=${productId}`, null).pipe(
          tap((res) => {
            if (res.status === 'success') {
                this.fetchFavorites().subscribe();
            }
          })
        );
      }
      
  }
  
