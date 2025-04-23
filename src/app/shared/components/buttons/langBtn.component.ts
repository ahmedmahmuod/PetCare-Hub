import { LanguageService } from './../../../core/services/language/language.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-toggle" [ngClass]="currentLang === 'ar' ? 'language-toggle-ar' : 'language-toggle-en'">
      <button [dir]="currentLang === 'en' ? 'rlt' : 'ltr'" (click)="toggleLanguage()" class="toggle-btn" [class.ar]="currentLang === 'ar'" [class.en]="currentLang === 'en'">
        <span class="toggle-circle">
          <span class="lang-icon">{{ currentLang === 'ar' ? 'ع' : 'En' }}</span>
        </span>
        <span class="lang-text">{{ currentLang === 'ar' ? 'English' : 'عربي' }}</span>
      </button>
    </div>
  `,
  styles: [`
    .language-toggle {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .language-toggle-en {
        right: -62px;
      }
      .language-toggle-ar {
        left: -62px;
    }

    .language-toggle-en:hover {
       right: -5px; 
    }
    .language-toggle-ar:hover {
       left: -5px; 
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--brand-color);
      border: 1.5px solid #e2e8f0;
      padding: 10px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.3s ease;
      position: relative;
      min-width: 90px;
      box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .toggle-btn:hover { box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.2); }
    .toggle-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background: var(--brand-seconed-color);
      border-radius: 50%;
      color: var(--brand-color);
      font-weight: 600;
    }
    .toggle-btn.ar { flex-direction: row-reverse; }
    .toggle-btn.ar .toggle-circle { background: var(--brand-seconed-color); }
  `]
})
export class LanguageToggleComponent {
  currentLang: string = 'en';
  private languageService = inject(LanguageService);

  constructor() {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(newLang);
  }
}
