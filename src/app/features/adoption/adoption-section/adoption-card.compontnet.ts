import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../../../core/models/pets/pet.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-adoption',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="cards-container" [class.slider-mode]="displayMode === 'slider'">
      <div class="card" *ngFor="let item of items">
        <div class="card-inner">
          <img [src]="item.petImage || 'logos/pet-placeholder.png'" [alt]="item.name" class="pet-image" loading="lazy"/>
          <div class="overlay">
          <span></span>
            <div class="content">
              <h3>
                {{ item.weight }} {{ 'Pages.Adoption.Card.Kg' | translate }}
              </h3>
              <div class="flex items-center justify-between">
                <h3 class="pet-name">{{ item.name }}</h3>
                <div class="flex items-center gap-1">
                  <span class="pet-type-badge">
                    {{ item.type === 'dog' ? ('Pages.Adoption.Card.Dog' | translate) : ('Pages.Adoption.Card.Cat' | translate)}}
                  </span>
                  <span class="pet-gender-badge">
                    {{ item.gender === 'male' ? ('Pages.Adoption.Card.Gender.Male' | translate) : ('Pages.Adoption.Card.Gender.Female' | translate)}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 2fr));
        gap: 1.5rem;
        margin: 10px;
      }

      .slider-mode {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 10px;
    }
    
    .slider-mode .card {
      flex: 0 0 auto;
      width: 270px;
      scroll-snap-align: start;
    }
    
    .slider-mode::-webkit-scrollbar {
      display: none;
    }

      .card {
        border-radius: 16px;
        overflow: hidden;
        aspect-ratio: 4/4;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 16px;
        transition: transform 0.4s ease;
      }

      .card-inner:hover {
        transform: translateY(-2px);
      }

      .pet-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
      }

      .card-inner:hover .pet-image {
        transform: scale(1.04);
      }

      .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8) 0%,
          rgba(0, 0, 0, 0.4) 30%,
          rgba(0, 0, 0, 0) 60%
        );
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem;
        transition: 0.3s ease;
      }

      .card-inner:hover .overlay {
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.9) 0%,
          rgba(0, 0, 0, 0.5) 40%,
          rgba(0, 0, 0, 0.2) 70%
        );
      }

      .favorite-button {
        align-self: flex-end;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .pet-type-badge,
      .pet-gender-badge {
        background-color: var(--brand-color);
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.8rem;
        color: var(--brand-seconed-color);
        text-transform: capitalize;
      }

      .pet-name {
        margin: 0;
        font-size: 1rem;
        color: white;
        font-weight: 700;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      @media (max-width: 768px) {
        .cards-container {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .overlay {
          padding: 0.875rem;
        }

        .pet-name {
          font-size: 1.25rem;
        }

        .pet-type-badge {
          padding: 0.375rem 0.75rem;
          font-size: 0.8125rem;
        }
      }

      @media (max-width: 480px) {
        .cards-container {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }

        .overlay {
          padding: 0.75rem;
        }

        .pet-name {
          font-size: 1.125rem;
        }

        .pet-type-badge {
          padding: 0.325rem 0.675rem;
          font-size: 0.75rem;
        }
      }
    `,
  ],
})
export class AdoptionCardComponent {
  @Input() items!: Pet[] | null;
  @Input() displayMode: 'grid' | 'slider' = 'grid';
  @Input() isFavoritable: boolean = true;

  isFavorite = false;
  
  onFavoriteChange(value: boolean) {
    this.isFavorite = value;
  }
}
