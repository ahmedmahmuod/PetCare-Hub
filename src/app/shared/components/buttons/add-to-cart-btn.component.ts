// add-to-cart-button.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <button (click)="addToCart()" class="w-full bg-brand-color text-seconed-color py-2 rounded-lg font-semibold hover:opacity-90 shadow-md flex items-center justify-center gap-2 transition-all duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
      {{'Global.Add_To_Cart_Btn' | translate}}
    </button>
  `,
})
export class AddToCartButtonComponent {
  @Output() addTo = new EventEmitter<void>();

  addToCart () {
    this.addTo.emit();
  }
}
