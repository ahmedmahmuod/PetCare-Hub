import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/products/product.model';
import { CartItem } from '../../../core/models/cart/cart.model';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, SectionSpinnerComponent],
  template: `
    <div class="cart-item relative">
      <div class="item-image">
        <img [src]="item.product.productImage" [alt]="item.product.name">
      </div>
      <div class="item-details">
      <app-section-spinner *ngIf="isLoading"/>
        <div class="item-header">
          <h3>{{ item.product.name }}</h3>
          <button class="remove-button" (click)="deleteItemFromCart()">
            <i class="fa-regular fa-trash-can"></i>          
          </button>
        </div>
        <div class="price-section">
          <div class="current-price">EGP {{ item.price }}</div>
          @if (item.product.discount) {
            <div class="original-price">EGP {{ item.product.price }}</div>
            <div class="discount-badge">{{ item.product.discount }}% OFF</div>
          }
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" (click)="updateQuantity(item.quantity - 1, 'minusquantity')" [disabled]="item.quantity <= 1">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button class="quantity-btn" (click)="updateQuantity(item.quantity + 1, 'plusquantity')">+</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 150, 0, 0.2);
    }

    .item-image {
      width: 100px;
      height: 100px;
      flex-shrink: 0;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }

    .item-header h3 {
      margin: 0;
      font-size: 16px;
      color: var(--brand-color);
    }

    .remove-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--fourth-color);
      font-size: 25px;

      :hover {
        color: red;
      }
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .current-price {
      font-weight: bold;
      color: var(--brand-color);
    }

    .original-price {
      text-decoration: line-through;
      color: var(--fourth-color);
      font-size: 14px;
    }

    .discount-badge {
      background: var(--third-color);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      color: var(--fourth-color);
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .quantity-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: var(--brand-color);
      color: var(--seconed-color);;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .quantity-btn:disabled {
      background: var(--third-color);
      cursor: not-allowed;
    }

    .quantity {
      font-size: 14px;
      color: var(--brand-color);
    }

    @media (max-width: 480px) {
      .cart-item {
        flex-direction: column;
      }

      .item-image {
        width: 100%;
        height: 200px;
      }
    }
  `]
})
export class CartItemComponent {
  @Input({ required: true }) item!: CartItem;
  @Output() quantityChange = new EventEmitter<{ newQuantity: number; action: string }>();
  @Output() removeItem = new EventEmitter<void>();

  isLoading: boolean = false;

  // updaate the product from cart
  updateQuantity(newQuantity: number, action: string) {
    this.isLoading = true;
    this.quantityChange.emit({ newQuantity, action });
  }
  
  // Delete the product from cart
  
  deleteItemFromCart() {
    this.isLoading = true;
    this.removeItem.emit();
  }
} 