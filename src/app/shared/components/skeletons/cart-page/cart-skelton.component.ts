import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animate-pulse container mx-auto mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 flex flex-col gap-4">
          <div *ngFor="let i of [1,2,3]" class="bg-gray-100 rounded-lg p-6 h-28"></div>
        </div>
        <div class="lg:col-span-4 bg-gray-100 rounded-lg p-6 h-64"></div>
      </div>
    </div>
  `
})
export class CartSkeletonComponent {}
