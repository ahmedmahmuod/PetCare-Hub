import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-services-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
      <div *ngFor="let item of skeletonItems" class="sm:m-0 mx-5 flex flex-col bg-third-color rounded-3xl border-2 border-fourth-color overflow-hidden">
        <div class="relative w-full h-64">
          <div class="w-full h-full pulse bg-gray-200"></div>
          <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <div class="w-20 h-4 pulse bg-gray-200 rounded-full"></div>
          </div>
        </div>
        
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <div class="w-24 h-6 pulse bg-gray-200 rounded"></div>
            <div class="flex items-center">
              <div class="w-16 h-6 pulse bg-gray-200 rounded"></div>
            </div>
          </div>
          
          <div class="flex items-center">
            <div class="w-4 h-4 pulse bg-gray-200 rounded-full"></div>
            <div class="ml-1 w-20 h-4 pulse bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pulse {
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  `]
})
export class SkeletonCardComponent {
  @Input() count: number = 8;
  skeletonItems: number[] = [];

  ngOnInit() {
    this.skeletonItems = Array(this.count).fill(0).map((x, i) => i);
  }
}