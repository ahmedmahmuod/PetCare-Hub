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
      window.addEventListener('storage', (event) => {
        if (event.key === 'language' && event.newValue) {
          this.currentLanguageSubject.next(event.newValue);
        }
      });
    }
  }

  // getLanguageFromLocalStorage method to get the current language from localStorage
  private getLanguageFromLocalStorage(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('language') || 'en' : 'en';
  }

  // switchLanguage method to change the language
  public switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.currentLanguageSubject.next(lang);
  }

  // getCurrentLanguage method to get the current language
  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}
