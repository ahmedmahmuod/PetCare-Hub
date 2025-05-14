import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from './popupLog.service';

@Component({
  selector: 'app-login-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="showPopup$ | async" class="fixed inset-0 flex items-center justify-center z-50">
      <div 
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        (click)="closePopup()"
      ></div>
      
      <div 
        class="bg-white/90 backdrop-blur-md w-full max-w-md rounded-xl shadow-2xl p-6 m-4 z-10 animate-in"
        style="animation: fadeIn 0.3s ease-out;"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">Welcome to Demo</h2>
          <button 
            (click)="closePopup()"
            class="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p class="text-gray-600 mb-5">
          Use these credentials to test the application:
        </p>
        
        <div class="bg-blue-50 rounded-lg p-4 mb-3">
          <div class="flex items-center mb-2">
            <h3 class="font-semibold text-brand-color">Admin Account</h3>
          </div>
          <div class="pl-7 text-sm">
            <div class="flex items-center mb-1">
              <span class="font-mono bg-blue-100 px-2 py-1 rounded">{{adminEmail}}</span>
              <button 
                (click)="copyToClipboard(adminEmail)"
                class="ml-2 p-1 text-brand-color hover:opacity-80"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            <div class="flex items-center">
              <span class="font-mono bg-blue-100 px-2 py-1 rounded">Password: {{password}}</span>
              <button 
                (click)="copyToClipboard(password)"
                class="ml-2 p-1 text-brand-color  hover:opacity-80"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div class="bg-green-50 rounded-lg p-4 mb-5">
          <div class="flex items-center mb-2">
            <h3 class="font-semibold text-green-700">User Account</h3>
          </div>
          <div class="pl-7 text-sm">
            <div class="flex items-center mb-1">
              <span class="font-mono bg-green-100 px-2 py-1 rounded">{{userEmail}}</span>
              <button 
                (click)="copyToClipboard(userEmail)"
                class="ml-2 p-1 text-green-500 hover:text-green-700"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
            <div class="flex items-center">
              <span class="font-mono bg-green-100 px-2 py-1 rounded">Password: {{password}}</span>
              <button 
                (click)="copyToClipboard(password)"
                class="ml-2 p-1 text-green-500 hover:text-green-700"
                title="Copy to clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            id="dontShowAgain"
            [(ngModel)]="dontShowAgain"
            class="mr-2 h-4 w-4 text-brand-color rounded"
          >
          <label for="dontShowAgain" class="text-sm text-gray-600">Don't show this again</label>
        </div>
        
        <button
          (click)="closePopup()"
          class="w-full py-2 px-4 bg-brand-color hover:opacity-80 text-seconed-color font-medium rounded-lg transition-colors"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginPopupComponent {
  private popupService = inject(PopupService);
  
  showPopup$ = this.popupService.showPopup$;
  adminEmail = "admin@example.com";
  userEmail = "user@example.com";
  password = "demo1234";
  dontShowAgain = false;

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard: ' + text);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  closePopup() {
    this.popupService.hidePopup(this.dontShowAgain);
  }
}