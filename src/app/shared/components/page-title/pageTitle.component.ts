import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="page-title-container">
      <div class="title-wrapper">
        <div class="title-content">
          <span class="subtitle" *ngIf="subtitle">{{ subtitle | translate }}</span>
          <h1>
            <span [ngClass]="{'title-dark': titleDark}" class="title-text">{{ title | translate }}</span>
          </h1>
          <div *ngIf="description" class="description-wrapper">
            <p class="description">
              <span [ngClass]="{'des-dark': titleDark}" class="description-text">{{ description | translate }}</span>
            </p>
          </div>
          <div class="title-decoration">
            <span [ngClass]="{'decoration': !titleDark}" class="dot"></span>
            <span [ngClass]="{'decoration': !titleDark}" class="line"></span>
            <span [ngClass]="{'decoration': !titleDark}" class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-title-container {
      text-align: center;
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
    }

    .title-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      opacity: 0;
      animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .title-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .subtitle {
      font-size: clamp(0.875rem, 1.5vw, 1rem);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: var(--fourth-color);
      font-weight: 500;
      opacity: 0;
      animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.2s;
    }

    h1 {
      font-size: clamp(1.75rem, 5vw, 3rem);
      font-weight: 800;
      color: var(--brand-color);
      margin: 0;
      padding: 0;
      position: relative;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }

    .title-dark {
      color: var(--brand-seconed-color);
    }

    .des-dark {
      color: var(--seconed-color);
    }

    .title-decoration {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;
      opacity: 0;
      animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.4s;
    }

    .dot {
      width: 5px;
      height: 5px;
      background-color: var(--brand-seconed-color);
      border-radius: 50%;
    }

    .line {
      width: 40px;
      height: 4px;
      background: var(--brand-seconed-color);
    }
    
    .decoration {
      background-color: var(--brand-color);
    }

    .description-wrapper {
      opacity: 0;
      animation: fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.6s;
    }

    .description {
      font-size: clamp(1rem, 2vw, 1.125rem);
      color: var(--fourth-color);
      line-height: 1.7;
      margin: 0 auto;
      max-width: min(100%, 650px);
      font-weight: 400;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(15px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .title-decoration {
        margin: 0.375rem 0;
      }

      .line {
        width: 30px;
      }

      .dot {
        width: 3px;
        height: 3px;
      }
    }

    @media (max-width: 480px) {
      .page-title-container {
        padding: 0.25rem 0.75rem;
      }

      .description-wrapper {
        padding: 0 0.5rem;
      }
    }
  `],
})
export class PageTitleComponent {
  @Input({ required: true }) title: string = '';
  @Input() description?: string;
  @Input() subtitle?: string;
  @Input() titleDark?: boolean;
  @Input() desDark?: boolean;
}