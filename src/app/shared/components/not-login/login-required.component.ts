import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-login-required',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <div class="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div class="rounded-lg bg-brand-color shadow-md p-8 max-w-[420px] w-full mx-auto">
        <div class="text-center">
          <!-- Icon Container -->
          <div class="w-20 h-20 bg-brand-seconed-color rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-lock text-3xl text-brand-color"></i>
          </div>
          
          <!-- Text Content -->
          <h2 class="text-2xl font-semibold text-brand-seconed-color mb-3">
            {{'Global.Is_Not_Authenticated.Title' | translate}}
          </h2>
          <p class="text-third-color mb-8">
            {{'Global.Is_Not_Authenticated.Subtitle' | translate}}
          </p>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-4 mb-8">
          <a routerLink="/login" 
             class="block w-full bg-brand-seconed-color hover:opacity-90 text-brand-color text-center py-3 px-6 rounded transition duration-200 font-medium tracking-wide">
             {{'Global.Is_Not_Authenticated.Login' | translate}}
          </a>
          <a routerLink="/register" 
             class="block w-full bg-third-color text-brand-color text-center py-2.5 px-6 rounded transition duration-200 font-medium tracking-wide hover:opacity-90">
             {{'Global.Is_Not_Authenticated.Register' | translate}}
          </a>
        </div>
        
        <!-- Footer -->
        <div class="text-center">
          <div class="relative mb-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-third-color"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-4 py-1 rounded-xl bg-third-color text-sm text-brand-color">            
                {{'Global.Is_Not_Authenticated.Or' | translate}}
              </span>
            </div>
          </div>
          
          <p class="text-sm text-third-color">
          {{'Global.Is_Not_Authenticated.Help' | translate}}
          <a href="https://www.linkedin.com/in/ahmed-mahmuud/" class="text-brand-seconed-color hover:opacity-90 font-medium underline underline-offset-2 transition duration-200">
          {{'Global.Is_Not_Authenticated.Contact_Support' | translate}}
          </a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        transition-duration: 0.01ms !important;
      }
    }
  `]
})
export class LoginRequiredComponent {}