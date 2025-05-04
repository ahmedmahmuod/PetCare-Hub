import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart/cart.model';
import { CartSkeletonComponent } from "../../shared/components/skeletons/cart-page/cart-skelton.component";
import { take } from 'rxjs';
import { ToastService } from '../../shared/services/toast-notification/tost-notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, OrderSummaryComponent, CartSkeletonComponent],
  template: `
    <div class="cart-page container mx-auto mt-12">
      @if (isLoading ){
        <app-cart-skeleton/>
      } @else {
        <div *ngIf="cartService.cart$ | async as cart">
          <h1 class="mb-8 sm:mx-0 mx-4">
            <span class="text-3xl font-bold text-brand-color">Cart </span>
            <span class="text-xl font-medium text-fourth-color">({{cart.cartItems.length}} items)</span>
          </h1>
          <div class="cart-content">
            <!-- Left: Cart Items or Empty Message -->
            <div class="cart-items">
              <ng-container *ngIf="cart.cartItems.length > 0; else emptyCart">
                <app-cart-item *ngFor="let item of cart.cartItems" [item]="item" (quantityChange)="updateQuantity($event, item)" (removeItem)="removeItem(item)" />
              </ng-container>

              <ng-template #emptyCart>
                <div class="empty-cart">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  <h3>Your cart is empty</h3>
                  <p>Looks like you haven't added any items to your cart yet.</p>
                </div>
              </ng-template>
            </div>

            <!-- Right: Always show summary -->
            <div class="cart-summary">
              <app-order-summary [cartId]="cart._id" [isLoading]="isCouponLoading" (couponCode)="applyCoupon($event)" [subtotal]="calculateSubtotal(cart.cartItems)" [itemCount]="getTotalItems(cart.cartItems)" [shipping]="'FREE'"[total]="cart.totalPriceAfterDiscount || calculateSubtotal(cart.cartItems)"/>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .cart-header {
      margin-bottom: 2rem;
    }

    .cart-divider {
      height: 1px;
      background: linear-gradient(to right, 
        transparent 0%, 
        rgba(var(--brand-color-rgb), 0.1) 20%, 
        rgba(var(--brand-color-rgb), 0.1) 80%, 
        transparent 100%
      );
    }

    .cart-content {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      margin-top: 3rem;
    }

    .cart-items {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: calc(100% - 490px);
    }

    .cart-summary {
      width: 490px;
      position: sticky;
      top: 1rem;
      box-shadow: 0 1px 3px rgba(0, 150, 0, 0.2);
      padding: 1.5rem;
      height: fit-content;
    }

    .empty-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 3rem 1rem;
      text-align: center;
      border-radius: 0.5rem;
      width: 100%;
    }

    .empty-cart svg {
      color: var(--brand-color);
    }

    .empty-cart h3 {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--brand-color);
    }

    .empty-cart p {
      color: var(--fourth-color);
      max-width: 500px;
      margin: 0 auto;
    }

    /* Responsive Design */
    @media (max-width: 1400px) {
      .cart-title span:first-child {
        font-size: 2.25rem;
      }
      .cart-title span:last-child {
        font-size: 1.125rem;
      }
      .cart-items {
        max-width: calc(100% - 450px);
      }
      .cart-summary {
        width: 450px;
      }
    }

    @media (max-width: 1200px) {
      .cart-title span:first-child {
        font-size: 2rem;
      }
      .cart-title span:last-child {
        font-size: 1rem;
      }
      .cart-items {
        max-width: calc(100% - 400px);
      }
      .cart-summary {
        width: 400px;
      }
    }

    @media (max-width: 1024px) {
      .cart-items {
        max-width: calc(100% - 350px);
      }
      .cart-summary {
        width: 350px;
      }
    }

    @media (max-width: 900px) {
      .cart-header {
        margin-bottom: 1.75rem;
      }
      .cart-title span:first-child {
        font-size: 1.875rem;
      }
      .cart-title span:last-child {
        font-size: 0.9375rem;
      }
      .cart-content {
        flex-direction: column;
        gap: 1.5rem;
      }
      .cart-items {
        max-width: 100%;
      }
      .cart-summary {
        width: 100%;
        position: static;
        margin-top: 1rem;
        padding: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .cart-header {
        margin-bottom: 1.5rem;
      }
      .cart-title span:first-child {
        font-size: 1.75rem;
      }
      .cart-title span:last-child {
        font-size: 0.875rem;
      }
      .cart-page {
        padding: 0 1rem;
      }
      .cart-content {
        margin-top: 2rem;
        gap: 1.5rem;
      }
      .cart-summary {
        padding: 1.25rem;
      }
      .empty-cart {
        padding: 2rem 1rem;
      }
    }

    @media (max-width: 480px) {
      .cart-header {
        margin-bottom: 1.25rem;
      }
      .cart-title span:first-child {
        font-size: 1.625rem;
      }
      .cart-title span:last-child {
        font-size: 0.8125rem;
      }
      .cart-page {
        padding: 0 0.75rem;
      }
      .cart-content {
        margin-top: 1.5rem;
        gap: 1rem;
      }
      .cart-summary {
        padding: 1rem;
      }
      .empty-cart {
        padding: 1.5rem 0.75rem;
      }
      .empty-cart h3 {
        font-size: 1.2rem;
      }
      .empty-cart p {
        font-size: 0.9rem;
        padding: 0 1rem;
      }
      .empty-cart svg {
        width: 48px;
        height: 48px;
      }
    }

    @media (max-width: 400px) {
      .cart-header {
        margin-bottom: 1rem;
      }
      .cart-title span:first-child {
        font-size: 1.5rem;
      }
      .cart-title span:last-child {
        font-size: 0.75rem;
      }
      .cart-page {
        padding: 0 0.5rem;
      }
      .cart-content {
        margin-top: 1.25rem;
        gap: 0.75rem;
      }
      .cart-summary {
        padding: 0.75rem;
      }
      .empty-cart {
        padding: 1.25rem 0.5rem;
      }
      .empty-cart h3 {
        font-size: 1.1rem;
      }
      .empty-cart p {
        font-size: 0.85rem;
        padding: 0 0.75rem;
      }
      .empty-cart svg {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  private toastService = inject(ToastService);
  public cartService = inject(CartService);

  isLoading = false;
  isCouponLoading = false;

  ngOnInit(): void {
    this.isLoading = true;

    this.cartService.cart$.pipe(take(1)).subscribe({
      next: (cart) => {
        if (!cart) {
          this.cartService.fetchCart().subscribe({
            next: () => {
              this.isLoading = false;
            },
            error: (err) => {
              this.isLoading = false;
              // Initialize empty cart state
              this.cartService.cartState$.next({
                _id: '',
                cartItems: [],
                user: '',
                createdAt: '',
                updatedAt: '',
                totalCartPrice: 0,
                totalPriceAfterDiscount: 0,
                __v: 0
              });
            }
          });
        } else {
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.isLoading = false;
        // Initialize empty cart state
        this.cartService.cartState$.next({
          _id: '',
          cartItems: [],
          user: '',
          createdAt: '',
          updatedAt: '',
          totalCartPrice: 0,
          totalPriceAfterDiscount: 0,
          __v: 0
        });
        this.toastService.error('Error', 'Failed to load cart. Please try again later.');
      }
    });
  }

  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalItems(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  updateQuantity(newQuantity: any, item: CartItem) {
    item.quantity = newQuantity.newQuantity;
    this.cartService.changeQuantity(item._id, newQuantity.action).subscribe({
      next: () => {},
      error: () => {
        this.toastService.error('Error!', 'An error occurred while updating the product!');
      }
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeItemCart(item.product._id).subscribe({
      error: () => {
        this.toastService.error('Error!', 'An error occurred while deleting the product!');
      }
    });
  }

  applyCoupon(code: string) {
    this.isCouponLoading = true;
    this.cartService.applyCoupon(code).subscribe({
      next: () => {
        this.toastService.success('Success!', 'Coupon applied successfully.');
        this.isCouponLoading = false;
      },
      error: () => {
        this.toastService.error('Error!', 'Coupon is invalid or expired.');
        this.isCouponLoading = false;
      }
    });
  }
} 