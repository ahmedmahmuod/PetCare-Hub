import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-global-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="service-card" [ngClass]="{ 'card-link-one': linkStyled1, 'card-link-two': linkStyled2 ,'active-card': isActive }">
      <img [src]="imageUrl" [alt]="title" loading="lazy"/>
      <h1 [ngClass]="{'active-h1': isActive}">{{ title | translate }}</h1>
    </div>
  `,
  styles: [
    `
      .service-card {
        background: var(--third-color);
        border-radius: 24px;
        box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 15px;
        width: 250px;
        height: 150px;
        text-align: center;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(37, 99, 235, 0.15);
      }

      .card-link-one {
        background: var(--brand-seconed-color);
        cursor: pointer;
      }

      .card-link-two {
        cursor: pointer;
      }

      .service-card img {
        width: 60px;
        height: 60px;
        object-fit: contain;
      }

      .service-card h1 {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--brand-color);
        margin-top: 10px;
        font-family: var(--font-family);
      }

      .service-card:hover {
        transform: translateY(-5px);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
      }

      .active-card {
        background: var(--brand-color);
      }
      
      .active-h1 {
        color: var(--seconed-color) !important;
      }
    `,
  ],
})
export class GlobalCardComponent {
  @Input({ required: true }) imageUrl: string = ''; 
  @Input({ required: true }) title: string = ''; 
  @Input() linkStyled1: boolean = false; 
  @Input() linkStyled2: boolean = false;
  @Input() isActive: boolean = false;
  
}
