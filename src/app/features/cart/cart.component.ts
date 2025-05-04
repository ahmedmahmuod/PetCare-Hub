import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PageTitleComponent } from "../../shared/components/page-title/pageTitle.component";
import { CartService } from '../../core/services/cart/cart.service';
import { CartItem } from '../../core/models/cart/cart.model';
import { CartSkeletonComponent } from "../../shared/components/skeletons/cart-page/cart-skelton.component";
import { take } from 'rxjs';
import { ToastService } from '../../shared/services/toast-notification/tost-notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, OrderSummaryComponent, PageTitleComponent, CartSkeletonComponent],
  template: `
    <div class="container mx-auto mt-12">
      <app-page-title [title]="'Your Shopping Cart'" />

      @if (isLoading) {
        <app-cart-skeleton/>
      } @else {
        <div *ngIf="cartService.cart$ | async as cart">
          <div class="cart-content">
            <!-- Left: Cart Items or Empty Message -->
            <div class="cart-items">
              <ng-container *ngIf="cart.cartItems.length > 0; else emptyCart">
                <app-cart-item *ngFor="let item of cart.cartItems" [item]="item" (quantityChange)="updateQuantity($event, item)"(removeItem)="removeItem(item)" />
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
              <app-order-summary [isLoading]="isCouponLoading" (couponCode)="applyCoupon($event)" [subtotal]="calculateSubtotal(cart.cartItems)" [itemCount]="getTotalItems(cart.cartItems)" [shipping]="'FREE'" [total]="cart.totalPriceAfterDiscount || calculateSubtotal(cart.cartItems)" />            />
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .cart-content {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 490px;
      gap: 2rem;
      align-items: flex-start;
      margin-top: 3rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cart-summary {
      position: sticky;
      top: 1rem;
      box-shadow: 0 1px 3px rgba(0, 150, 0, 0.2);
      padding: 1.5rem;
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

    @media (max-width: 1024px) {
      .cart-content {
        grid-template-columns: minmax(0, 1fr) 320px;
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
        margin-top: 1rem;
      }
    }

    @media (max-width: 480px) {
      .cart-container {
        padding: 1rem 0.5rem;
      }

      .cart-title {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
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
    this.cartService.cart$.pipe(take(1)).subscribe((cart) => {
      if (!cart || cart.cartItems.length === 0) {
        this.isLoading = true;
        this.cartService.fetchCart().subscribe(() => {
          this.isLoading = false;
        });
      }
    });
  }

  calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTotalItems(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }

  // update the cart item quantity
  updateQuantity(newQuantity: any, item: CartItem) {
    item.quantity = newQuantity.newQuantity;
    this.cartService.changeQuantity(item._id, newQuantity.action).subscribe({
      next: () => {

      },
      error: () => {
        this.toastService.error('Error!', 'An error occurred while updating the product!');
      }
    });
  }
  
  // Remove item from cart
  removeItem(item: CartItem) {
    this.cartService.removeItemCart(item.product._id).subscribe({
      error: () => {
        this.toastService.error('Error!', 'An error occurred while deleting the product!.');
      }
    });
  }

  // apply coupon
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
