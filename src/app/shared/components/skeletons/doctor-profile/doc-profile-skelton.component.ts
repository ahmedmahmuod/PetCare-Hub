import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-profile-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen animate-pulse">
      <div class="container mx-auto px-4 space-y-8">

        <!-- Header Skeleton -->
        <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
          <div class="bg-gray-300 h-32"></div>
          <div class="px-6 pb-6">
            <div class="flex flex-col md:flex-row gap-6 -mt-16">
              <div class="w-32 h-32 rounded-xl bg-gray-300 border-4 border-gray-400 shadow-sm"></div>
              <div class="flex-1 pt-4 flex flex-col items-center gap-4">
                <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
                <div class="h-4 w-3/4 bg-gray-300 rounded"></div>
                <div class="flex gap-4 flex-wrap justify-center">
                  <div class="h-8 w-28 rounded-full bg-gray-300"></div>
                  <div class="flex gap-2">
                    <div class="h-8 w-20 bg-gray-300 rounded-full"></div>
                    <div class="h-8 w-20 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div class="flex items-start max-md:justify-center">
                <div class="h-11 w-32 bg-gray-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">

            <!-- About -->
            <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 space-y-4">
              <div class="h-6 w-1/4 bg-gray-300 rounded"></div>
              <div class="space-y-2">
                <div class="h-4 w-full bg-gray-200 rounded"></div>
                <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            </div>

            <!-- Gallery -->
            <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
              <div class="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="h-48 bg-gray-300 rounded-xl" *ngFor="let i of [1,2,3,4,5,6]"></div>
              </div>
            </div>
          </div>

          <!-- Side Cards -->
          <div class="space-y-8">
            <!-- Specializations -->
            <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 space-y-4">
              <div class="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div class="space-y-3">
                <div *ngFor="let i of [1,2,3,4]">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-300 rounded-lg"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact -->
            <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 space-y-4">
              <div class="h-6 w-1/3 bg-gray-300 rounded"></div>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="h-5 w-5 bg-gray-300 rounded"></div>
                  <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="h-5 w-5 bg-gray-300 rounded"></div>
                  <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)] space-y-4">
          <div class="h-6 w-1/4 bg-gray-300 rounded"></div>
          <div *ngFor="let i of [1,2,3]" class="space-y-2">
            <div class="h-4 w-1/3 bg-gray-200 rounded"></div>
            <div class="h-4 w-full bg-gray-200 rounded"></div>
            <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .animate-pulse {
      animation: pulse 1.5s ease-in-out infinite;
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
export class DoctorProfileSkeletonComponent {}
