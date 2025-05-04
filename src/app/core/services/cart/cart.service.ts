import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartResponse, CartData, CartItem } from '../../models/cart/cart.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);

  private cartState$ = new BehaviorSubject<CartData | null>(null);
  private appliedCoupon: string | null = localStorage.getItem('appliedCoupon');

  cart$ = this.cartState$.asObservable();

  // Set and persist coupon
  setCoupon(code: string) {
    this.appliedCoupon = code;
    localStorage.setItem('appliedCoupon', code);
  }

  // Get coupon from memory or storage
  getCoupon(): string | null {
    return this.appliedCoupon || localStorage.getItem('appliedCoupon');
  }

  // Remove coupon from memory and storage
  clearCoupon() {
    this.appliedCoupon = null;
    localStorage.removeItem('appliedCoupon');
  }

  // Get and update the cart state
  fetchCart(): Observable<CartData> {
    return this.http.get<CartResponse>(environment.apiUrl + `cart/getcart`).pipe(
      tap((res) => {
        this.cartState$.next(res.data);

        // Reapply coupon after refresh
        const code = this.getCoupon();
        if (code) {
          this.applyCoupon(code).subscribe(); // safe to call because patch will update total only
        }
      }),
      map(res => res.data)
    );
  }

  // Apply coupon and refresh
  applyCoupon(code: string): Observable<any> {
    return this.http.patch<any>(environment.apiUrl + `cart/applycoupon`, { coupon: code }).pipe(
      tap(() => {
        this.setCoupon(code); // store it
        this.refreshCart();
      })
    );
  }

  // Refresh manually
  refreshCart(): void {
    this.fetchCart().subscribe();
  }

  // Quantity update with reapply coupon if needed
  changeQuantity(productId: string, action: 'plusquantity' | 'minusquantity'): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}cart/${action}?productId=${productId}`, null).pipe(
      tap(() => {
        const code = this.getCoupon();
        if (code) {
          this.applyCoupon(code).subscribe();
        } else {
          this.refreshCart();
        }
      })
    );
  }
  
  // Quantity update with reapply coupon if needed
  removeItemCart(productId: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}cart/addproduct?productId=${productId}`, null).pipe(
      tap(() => {
        const code = this.getCoupon();
        if (code) {
          this.applyCoupon(code).subscribe();
        } else {
          this.refreshCart();
        }
      })
    );
  }
  

  
  // Getters
  getCartItems(): CartItem[] {
    return this.cartState$.getValue()?.cartItems || [];
  }

  getCartItemCount(): number {
    return this.getCartItems().length;
  }

  getTotalPrice(): number {
    return this.cartState$.getValue()?.totalCartPrice || 0;
  }

  getTotalAfterDiscount(): number {
    return this.cartState$.getValue()?.totalPriceAfterDiscount || 0;
  }
}
