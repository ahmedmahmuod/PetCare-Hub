import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomButtonComponent } from "../buttons/global-btn.component";

export interface CardItem {
  image: string;
  title: string;
  subTitle: string;
  buttonText?: string;
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, CustomButtonComponent],
  template: `
    <div class="card-list container">
      <div class="card-container">
        @for (item of cards; track $index) {
          <div class="card">
            <div class="card-content">
              <div class="image-wrapper">
                <div class="image-overlay"></div>
                <img [src]="item.image" [alt]="item.title" loading="lazy"/>
              </div>
              <div class="text-content">
                <h3>{{ item.title | translate }}</h3>
                <p>{{ item.subTitle | translate }}</p>
              </div>
              @if (item.buttonText || defaultButtonText) {
                <app-global-button [text]="defaultButtonText" class="card-button"/>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
   .card-list {
  margin-top: 2rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
}

.card {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 8px 8px 20px rgb(0 0 0 / 4%), -8px -8px 20px rgba(255, 255, 255, 0.7);
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    12px 12px 30px rgba(0, 0, 0, 0.12),
    -12px -12px 30px rgba(255, 255, 255, 0.8);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  height: 100%;
  position: relative;
  z-index: 1;
}

.image-wrapper {
  width: 140px;
  height: 140px;
  position: relative;
  margin-bottom: 2rem;
  padding: 1rem;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .image-wrapper img {
  transform: scale(1.1) rotate(5deg);
}

.text-content {
  text-align: center;
  margin-bottom: 2rem;
  flex-grow: 1;
}

h3 {
  color: var(--brand-color);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.3;
  position: relative;
  display: inline-block;
}

p {
  color: var(--fourth-color);
  margin: 1rem 0 0;
  font-size: 1rem;
}

.card-button {
  margin-top: auto;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.card:hover .card-button {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .card-list {
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .image-wrapper {
    width: 120px;
    height: 120px;
  }

  h3 {
    font-size: 1.4rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card-button,
  .image-wrapper img,
  h3::after {
    transition: none;
  }

  .card:hover {
    transform: none;
  }

  .card:hover .image-wrapper img {
    transform: none;
  }

  .card:hover .card-button {
    transform: none;
  }
}
  `]
})
export class CardListComponent {
  @Input() cards: CardItem[] = [];
  defaultButtonText: string = 'Pages.Vets.Static_Section.Cards.Btn';
  @Input() columns: number = 3;

  @Output() buttonClick = new EventEmitter<CardItem>();
}