import { SectionSpinnerComponent } from './../../../shared/components/spinner/spinner-loading.component';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, FormsModule, SectionSpinnerComponent, TranslateModule],
  template: `
      <div class="order-summary">
        <h2>{{'Pages.Auth.Cart_Page.Cart_Summary.Title' | translate}}</h2>

        <!-- Coupon input + button + secret coupon box -->
        <div class="coupon-section-container">
          <div class="coupon-section">
            <input type="text" #couponeCode [placeholder]="('Pages.Auth.Cart_Page.Cart_Summary.Coupon.Input.Placeholder' | translate)"/>
            <button (click)="applyCoupon(couponeCode.value)" class="apply-btn">{{'Pages.Auth.Cart_Page.Cart_Summary.Coupon.Input.Btn' | translate}}</button>
          </div>
          
          <div class="secret-coupon-container" [class.revealed]="isCouponRevealed">
            <div class="secret-coupon-box" (click)="revealCoupon()" *ngIf="!isCouponRevealed" title="Find a discount">
              <span class="gift-icon">🎁</span>
            </div>
          </div>
        </div>

        <!-- Coupon Modal -->
        <div class="modal-overlay" *ngIf="isCouponRevealed" (click)="closeCoupon()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="closeCoupon()">×</button>
            <div class="modal-body">
              <div class="discount-badge">{{'Pages.Auth.Cart_Page.Cart_Summary.Coupon.Dialog.Title' | translate}}</div>
              <div class="discount-text">40% {{'Pages.Auth.Cart_Page.Cart_Summary.Coupon.Dialog.Discount' | translate}}</div>
              <div class="coupon-code">{{ discountCode }}</div>
              <button class="copy-btn" (click)="copyCoupon()" [class.copied]="isCouponCopied">
                {{ isCouponCopied ? ('Pages.Auth.Cart_Page.Cart_Summary.Coupon.Dialog.Copy.Copied' | translate) : ('Pages.Auth.Cart_Page.Cart_Summary.Coupon.Dialog.Copy.Title' | translate) }}
              </button>
            </div>
          </div>
        </div>

        <!-- Summary details -->
        <div class="summary-details relative">
          <div class="summary-row">
            <span>{{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Subtotal' | translate}} ({{ itemCount }} {{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Items' | translate}})</span>
            <span>{{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Currncy' | translate}} {{ itemCount }} {{ subtotal.toFixed(2) | number }}</span>
          </div>
          <div class="summary-row">
            <span>{{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Shipping_Fee' | translate}}</span>
            <span class="free-shipping">{{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Shipping' | translate}}</span>
          </div>
          <div class="summary-row total">
            <span>{{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Total' | translate}}</span>
            <span class="total-amount">
              <small>({{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Inclusive' | translate}})</small>
              {{'Pages.Auth.Cart_Page.Cart_Summary.Prices.Currncy' | translate}} {{ total.toFixed(2) | number }}
            </span>
          </div>
        </div>
        <app-section-spinner *ngIf="isLoading"/>
        
        <button class="checkout-btn" [disabled]="itemCount === 0 || isLoading" (click)="onCheckout()">
        {{ itemCount === 0 ? ('Pages.Auth.Cart_Page.Cart_Summary.Is_No_Items' | translate) : ('Pages.Auth.Cart_Page.Cart_Summary.Btn' | translate) }}
      </button>      
    </div>
  `,
  styles: [`
    .order-summary {
      position: relative;
    }

    h2 {
      margin: 0 0 20px;
      font-size: 20px;
      color: var(--brand-color);
    }

    .coupon-section-container {
      display: flex;
      align-items: flex-start;
      margin-bottom: 24px;
      position: relative;
      gap: 10px;
    }

    .coupon-section {
      display: flex;
      border: 1px solid var(--brand-color);
      border-radius: 6px;
      overflow: hidden;
      flex: 1;
    }

    .coupon-section input {
      border: none;
      padding: 10px 12px;
      font-size: 14px;
      flex: 1;
      outline: none;
      background-color: transparent;
      color: var(--brand-color);
      min-width: 0;
    }

    .coupon-section .apply-btn {
      background: var(--brand-color);
      color: var(--seconed-color);
      padding: 10px 16px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: 0.2s;
      white-space: nowrap;
    }

    .coupon-section .apply-btn:hover {
      opacity: 0.9;
    }

    .secret-coupon-box {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      background-color: rgba(var(--brand-color-rgb), 0.05);
      border: 1px dashed rgba(var(--brand-color-rgb), 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      opacity: 0.7;
    }

    .gift-icon {
      font-size: 16px;
      opacity: 0.5;
      transition: all 0.3s ease;
    }

    .secret-coupon-box:hover {
      background-color: rgba(var(--brand-color-rgb), 0.1);
      transform: scale(1.05);
      opacity: 1;
    }

    .secret-coupon-box:hover .gift-icon {
      opacity: 1;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
    }

    .modal-content {
      background: var(--seconed-color);
      border-radius: 12px;
      padding: 24px;
      position: relative;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background: rgba(var(--brand-color-rgb), 0.1);
      color: var(--brand-color);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background: rgba(var(--brand-color-rgb), 0.2);
      transform: scale(1.1);
    }

    .modal-body {
      text-align: center;
    }

    .discount-badge {
      display: inline-block;
      background: var(--brand-color);
      color: var(--seconed-color);
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .discount-text {
      font-weight: bold;
      font-size: 36px;
      color: var(--brand-color);
      margin-bottom: 16px;
      letter-spacing: 1px;
    }

    .coupon-code {
      background: rgba(var(--brand-color-rgb), 0.08);
      border: 2px dashed var(--brand-color);
      border-radius: 8px;
      padding: 12px 24px;
      font-size: 24px;
      font-weight: 500;
      letter-spacing: 2px;
      margin: 16px 0;
      color: var(--brand-color);
    }

    .copy-btn {
      background: var(--brand-color);
      color: var(--seconed-color);
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
      font-size: 16px;
    }

    .copy-btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .copy-btn.copied {
      background-color: var(--brand-seconed-color);
    }

    .summary-details {
      border-top: 1px solid var(--third-color);
      padding-top: 16px;
      position: relative;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      color: var(--fourth-color);
      font-size: 14px;
    }

    .total {
      font-weight: bold;
      color: var(--brand-color);
      font-size: 16px;
      margin-top: 16px;
      border-top: 1px solid var(--third-color);
      padding-top: 16px;
    }

    .free-shipping {
      color: #4caf50;
      font-weight: bold;
    }

    .total-amount {
      text-align: right;
    }

    .total-amount small {
      display: block;
      font-size: 12px;
      color: var(--fourth-color);
      font-weight: normal;
    }

    .checkout-btn {
      width: 100%;
      background: var(--brand-color);
      color: var(--seconed-color);
      border: none;
      padding: 12px;
      border-radius: 25px;
      margin-top: 24px;
      font-weight: 500;
      cursor: pointer;
      transition: 0.2s;
      font-size: 16px;
    }

    .checkout-btn:hover {
      opacity: 0.9;
    }

    @media (max-width: 480px) {

      .secret-coupon-box {
        width: 100%;
        height: 44px;
      }

      .modal-content {
        margin: 20px;
      }

      .discount-text {
        font-size: 28px;
      }

      .coupon-code {
        font-size: 20px;
        padding: 10px 16px;
      }
    }
  `]
})
export class OrderSummaryComponent {
  private router = inject(Router)

  @Input() subtotal = 0;
  @Input() shipping = 'FREE';
  @Input() total = 0;
  @Input() itemCount = 0;
  @Input() cartId: string = '';

  @Output() couponCode = new EventEmitter<string>();
  @Input() isLoading: boolean = false;

  isCouponRevealed: boolean = false;
  isCouponCopied: boolean = false;
  discountCode: string = 'ANGULAR2026';

  applyCoupon(couponCode: string) {
    if (!couponCode.trim()) return;
    this.couponCode.emit(couponCode.trim());
  }

  revealCoupon() {
    this.isCouponRevealed = true;
  }

  closeCoupon() {
    this.isCouponRevealed = false;
    this.isCouponCopied = false;
  }

  copyCoupon() {
    navigator.clipboard.writeText(this.discountCode).then(() => {
      this.isCouponCopied = true;
      setTimeout(() => {
        this.isCouponCopied = false;
        this.isCouponRevealed = false;
      }, 1000);
    });
  }

  onCheckout() {
    this.router.navigate(['cart/checkout', this.cartId]);
    
  }
}
