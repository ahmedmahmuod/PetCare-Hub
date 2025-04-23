import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteIconComponent } from "../buttons/fav-btn.component";
import { AddToCartButtonComponent } from "../buttons/add-to-cart-btn.component";
import { Product } from '../../../core/models/products/product.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FavoriteIconComponent, AddToCartButtonComponent, TranslateModule ],
  template: `
    <div class="group rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">

      <!-- Favorite Button -->
      <div dir="ltr" class="absolute top-5 right-5 transform translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" aria-label="Add to favorites">
        <app-favorite-icon *ngIf="!isWishlist" />
        
        <button *ngIf="isWishlist" class="text-red-600 text-xl cursor-pointer">
            <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <!-- Discount Badge -->
      <div *ngIf="product.discount" class="absolute top-2 left-2 bg-red-500 text-seconed-color text-xs font-medium px-2 py-1 rounded z-10">
        {{ calculateDiscountPercentage(product.price, product.priceAfterDiscount) }}%
      </div>

      <!-- Product Image -->
      <div class="aspect-square p-6 bg-white">
        <img [src]="product.productImage" [alt]="product.name" class="w-full h-full object-contain" />
      </div>

      <!-- Product Info -->
      <div class="p-4 transition-all duration-300 group-hover:translate-y-[-48px]">
        <div class="text-sm text-fourth-color mb-1">{{ product.category | titlecase }}</div>
        <h3 class="font-medium text-brand-color mb-2 line-clamp-2">{{ product.name }}</h3>
        <div class="space-y-1">
          <div class="flex items-baseline gap-2">
            <span class="text-xl font-bold text-brand-color">{{ product.priceAfterDiscount }} {{'Pages.Shop.Product.Price_Unit' | translate}}</span>
            <span *ngIf="product.discount" class="text-sm text-fourth-color line-through">{{ product.price }}{{'Pages.Shop.Product.Price_Unit' | translate}}</span>
          </div>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <div class="absolute bottom-0 left-0 right-0 px-4 pb-4 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <app-add-to-cart-button/>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() calculateDiscountPercentage!: (original: number, discounted: number) => number;
  @Input() isWishlist: boolean = false;
  
  isLoggedIn = signal<boolean>(false);
}
