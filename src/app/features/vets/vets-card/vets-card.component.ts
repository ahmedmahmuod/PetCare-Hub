import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from "../../../shared/components/buttons/global-btn.component";

@Component({
  selector: 'app-vets-card',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="team-member">
      <div class="image-container" [ngClass]="{'animate-border-dark': borderDark, 'animate-border-light': !borderDark}">
        <img [src]="imageUrl" [alt]="name" class="member-image">
      </div>
      <h3 [ngStyle]="{'color': borderDark ? 'var(--brand-seconed-color)' : 'var(--brand-color)'}" class="member-name">{{ name }}</h3>
      <p [ngStyle]="{'color': borderDark ? 'var(--seconed-color)' : 'var(--fourth-color)'}" class="member-role">{{ specialized[0] || role }}</p>
      <app-global-button *ngIf="router" [routerLink]="router" [text]="buttonText" [buttonStyle]="darkMode === true ? 'light-bg' : 'dark-bg'"/>
    </div>
  `,
  styles: [`
    .team-member {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      text-align: center;
      margin: 1rem;
    }

    .image-container {
      position: relative;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      padding: 3px;
      margin-bottom: 1rem;
      z-index: 0;
      overflow: hidden;
    }

    .image-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px dashed;
      z-index: 1;
      pointer-events: none;
      transform-origin: center;
    }

    .animate-border-dark::before {
      border-color: var(--seconed-color);
      animation: rotateBorder 15s linear infinite;
    }

    .animate-border-light::before {
      border-color: var(--brand-color);
      animation: rotateBorder 15s linear infinite;
    }

    .member-image {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .member-name {
      font-size: 1.25rem;
      margin: 0.5rem 0;
      font-weight: bold;
    }

    .member-role {
      margin: 0;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .image-container {
        width: 150px;
        height: 150px;
      }

      .member-name {
        font-size: 1.1rem;
      }

      .member-role {
        font-size: 0.9rem;
      }
    }

    @keyframes rotateBorder {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `]
})
export class VetsCardComponent {
  @Input() imageUrl: string = '';
  @Input() name: string = '';
  @Input() role: string = '';
  @Input() buttonText: string = '';
  @Input() specialized: string[] = [];
  @Input() router!: string;
  @Input() borderDark: boolean = true;
  @Input() darkMode: boolean = true;
}
