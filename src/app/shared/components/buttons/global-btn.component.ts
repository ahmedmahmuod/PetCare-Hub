import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-global-button',
  standalone: true,
  imports: [CommonModule , RouterLink, TranslateModule],
  template: `
    <button [ngClass]="buttonStyle" [routerLink]="routerLink" class="m-5 transition-all ease-in-out">
      {{ text | translate }}
    </button>
  `,
  styles: [
    `
      button {
        background: none;
        border-radius: 20px;
        padding: 0.5rem 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      /* Default styling for dark background */
      .dark-bg {
        border: 1px solid var(--brand-color);
        color: var(--brand-color);
      }

      .dark-bg:hover {
        background: var(--brand-color);
        color: var(--seconed-color);
      }

      /* Styling for light background */
      .light-bg {
        border: 1px solid var(--seconed-color);
        color: var(--seconed-color);
      }

      .light-bg:hover {
        background: var(--seconed-color);
        color: var(--brand-color);
      }
    `
  ]
})
export class CustomButtonComponent {
  @Input() text!: string;
  @Input() routerLink!: string;
  @Input() buttonStyle: 'light-bg' | 'dark-bg' = 'dark-bg'; // Default to dark-bg
}
