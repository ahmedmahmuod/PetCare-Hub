import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../../core/models/cart/cart.model';
import { CartService } from '../../../core/services/cart/cart.service';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { ToastService } from '../../../shared/services/toast-notification/tost-notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionSpinnerComponent } from "../../../shared/components/spinner/spinner-loading.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface ShippingAddress {
  details?: string;
  phone: string;
  city: string;
  postalcode: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CartItemComponent, SectionSpinnerComponent, TranslateModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private toastService = inject(ToastService);
  public cartService = inject(CartService);
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private translate = inject(TranslateService);

  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  paymentMethod = 'cod';
  cartId: string | null = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      city: ['', Validators.required],
      postalcode: ['', Validators.required],
      details: ['']
    });
  }

  ngOnInit() {
    // Initial cart fetch
    this.cartService.fetchCart().subscribe();
    
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(cart => {
      if (cart) {
        this.cartItems = cart.cartItems;
      }
    });

    // Get cart id
    this.cartId = this.route.snapshot.paramMap.get('cartId');
  }

  get f() { return this.checkoutForm.controls; }

  get subtotal(): number {
    return this.cartService.getTotalPrice();
  }

  get total(): number {
    return this.cartService.getTotalAfterDiscount() || this.subtotal;
  }

  updateQuantity(newQuantity: any, item: CartItem) {
    this.cartService.changeQuantity(item._id, newQuantity.action).subscribe({
      error: () => {
        this.toastService.error(this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Updating.Title'), this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Updating.Message'));
      }
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeItemCart(item.product._id).subscribe({
      error: () => {
        this.toastService.error(this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Removing.Title'), this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Removing.Message'));
      }
    });
  }


  placeOrder(): void {
    // Check if cart is empty
    if (this.cartItems.length < 1) {
      this.toastService.info(this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Info.Place_Order.Title'), this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Info.Place_Order.Message'));
      this.router.navigate(['cart']);
      return;
    }

    // Validate form
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }


    this.isLoading = true;
    // Create order
    this.cartService.createCashOrder(this.checkoutForm.value, this.cartId).subscribe({
      next: (res) => {        
        // Show success message
        this.toastService.success(this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Successful.Place_Order.Title'), this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Successful.Place_Order.Message'));
        this.cartService.clearCoupon();
        this.cartService.cartState$.next({
          _id: '',
          cartItems: [],
          user: '',
          createdAt: '',
          updatedAt: '',
          totalCartPrice: 0,
          totalPriceAfterDiscount: 0,
          __v: 0
        })
        this.isLoading = false;
        
        this.router.navigate(['/', res.data._id])
      },
      error: (err) => {
        // Handle specific error cases
        if (err.status === 400) {
          this.toastService.error('Invalid Data', 'Please check your information and try again.');
        } else if (err.status === 401) {
          this.toastService.error('Authentication Required', 'Please login to place an order.');
          this.router.navigate(['/auth/login']);
        } else if (err.status === 500) {
          this.toastService.error('Server Error', 'Something went wrong. Please try again later.');
        } else {
          this.toastService.error(this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Place_Order.Title'), this.translate.instant('Pages.Auth.Check_Out_Page.Shipping_Info.Toasts.Errors.Place_Order.Message'));
        }
      }
    });
  }
} 