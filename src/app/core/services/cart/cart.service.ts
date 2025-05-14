import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartResponse, CartData, CartItem } from '../../models/cart/cart.model';
import { environment } from '../../../../environments/environment.prod';
import { ShippingAddress } from '../../../features/cart/checkout/checkout.component';
import { isPlatformBrowser } from '@angular/common'; // استيراد isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  
  cartState$ = new BehaviorSubject<CartData | null>(null);
  private appliedCoupon: string | null = null;
  
  cart$ = this.cartState$.asObservable();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.appliedCoupon = localStorage.getItem('appliedCoupon');
    }
  }

  // Set and persist coupon
  setCoupon(code: string) {
    this.appliedCoupon = code;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('appliedCoupon', code);
    }
  }

  // Get coupon from memory or storage
  getCoupon(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.appliedCoupon || localStorage.getItem('appliedCoupon');
    }
    return null;
  }

  // Remove coupon from memory and storage
  clearCoupon() {
    this.appliedCoupon = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('appliedCoupon');
    }
  }

  // Get and update the cart state
  fetchCart(): Observable<CartData> {
    return this.http.get<CartResponse>(environment.apiUrl + `cart/getcart`).pipe(
      tap((res) => {
        this.cartState$.next(res.data);
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

  // Quantity update
  changeQuantity(productId: string, action: 'plusquantity' | 'minusquantity'): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}cart/${action}?productId=${productId}`, null).pipe(
      tap(() => {
        this.refreshCart();
      })
    );
  }
  
  // Remove item from cart
  removeItemCart(productId: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}cart/addproduct?productId=${productId}`, null).pipe(
      tap(() => {
        this.refreshCart();
      })
    );
  }

  createCashOrder(orderDetails: ShippingAddress, cartId: string | null): Observable<any> {
    const url = `${environment.apiUrl}order/cashorder?cartId=${cartId}`;
    return this.http.post<any>(url, orderDetails);
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
