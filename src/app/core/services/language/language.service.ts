import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private currentLanguageSubject = new BehaviorSubject<string>(this.getLanguageFromLocalStorage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Add event listener for 'storage' event to detect language changes in localStorage
      window.addEventListener('storage', (event) => {
        if (event.key === 'language' && event.newValue) {
          this.currentLanguageSubject.next(event.newValue);
        }
      });
    }
  }

  // Method to get the current language from localStorage, defaults to 'en'
  private getLanguageFromLocalStorage(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('language') || 'en' : 'en';
  }

  // Method to switch the language and update localStorage
  public switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.currentLanguageSubject.next(lang); 
  }

  // Method to get the current language from BehaviorSubject
  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}
