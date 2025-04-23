import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinic-profile-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen animate-pulse">
      <div class="max-w-7xl mx-auto">

        <!-- Hero Section -->
        <div class="relative h-[70vh] w-full bg-gray-300">
          <div class="absolute inset-0 bg-black/40"></div>
          <div class="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
            <div class="max-w-4xl mx-auto">
              <div class="flex items-center space-x-4 mb-4">
                <div class="h-6 w-32 bg-gray-400 rounded"></div>
              </div>
              <div class="h-10 w-1/2 bg-gray-400 rounded mb-4"></div>
              <div class="h-6 w-3/4 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="max-w-4xl mx-auto px-4 py-16">
          <div class="grid md:grid-cols-2 gap-16">

            <!-- Location & Contact Skeleton -->
            <div class="space-y-8">
              <div class="h-6 w-1/3 bg-gray-400 rounded"></div>

              <div class="bg-gray-100 rounded-2xl p-6">
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-brand-seconed-color rounded-xl"></div>
                  <div class="ml-4 space-y-2">
                    <div class="h-5 w-24 bg-gray-300 rounded"></div>
                    <div class="h-4 w-40 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-100 rounded-2xl p-6">
                <div class="flex items-start">
                  <div class="w-12 h-12 bg-brand-seconed-color rounded-xl"></div>
                  <div class="ml-4 space-y-2">
                    <div class="h-5 w-24 bg-gray-300 rounded"></div>
                    <div class="h-4 w-40 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Review Skeleton -->
            <div>
              <div class="h-6 w-1/3 bg-gray-400 rounded mb-8"></div>
              <div class="bg-gray-100 rounded-2xl p-8 relative">
                <div class="absolute -top-4 left-8 h-10 w-24 bg-yellow-300 rounded-full"></div>
                <div class="h-6 bg-gray-300 rounded mt-6 mb-4 w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>

                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="flex items-center justify-between">
                    <div class="h-4 w-40 bg-gray-300 rounded"></div>
                    <div class="flex gap-1">
                      <div *ngFor="let i of [1,2,3,4,5]" class="h-5 w-5 bg-yellow-300 rounded"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-pulse {
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `]
})
export class ClinicProfileSkeletonComponent {}
