import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-section-spinner',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="section-spinner-overlay flex flex-col justify-center gap-3">
      <div class="spinner"></div>
      <span class="font-bold text-brand-seconed-color">{{'Global.Loading' | translate}}</span>
    </div>
  `,
  styles: [`
    .section-spinner-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      border-radius: 8px;
      backdrop-filter: blur(3px);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--brand-seconed-color, #3498db);
      border-top: 4px solid transparent;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class SectionSpinnerComponent {}
