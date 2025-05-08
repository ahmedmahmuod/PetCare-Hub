import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdoptionCardComponent } from './adoption-card.compontnet';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, of } from 'rxjs';
import { Pet } from '../../../core/models/pets/pet.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PetsActions from '../../../stores/pets-store/pets.actions';
import { selectPets, selectPetsLoading } from '../../../stores/pets-store/pets.selector';
import { PetsService } from '../../../core/services/pets/pets.services';
import { AdoptionSkeletonComponent } from "../../../shared/components/skeletons/adoption-card/adoption-skelton.component";

@Component({
  selector: 'app-adoption-section',
  standalone: true,
  imports: [CommonModule, AdoptionCardComponent, TranslateModule, AdoptionSkeletonComponent],
  template: `
    <section class="adoption-section">
      <div class="section-container">
        @if (loading()) {
          <app-adoption-skeleton [count]="4"/>
        } @else {
          <div class="content-wrapper">
            <ng-container *ngIf="filteredItems | async as items">
              <app-card-adoption [items]="items"></app-card-adoption>
            </ng-container>
            
            <div class="card more-card" (click)="onMoreClick()">
              <div class="more-content">
                <div class="icon-wrapper">
                  <img src="logos/pets2.png" alt="pets-logo" class="more-icon" />
                </div>
                <div class="text-content">
                  <p class="more-text">{{ moreText }}</p>
                  <div class="divider"></div>
                  <h3 class="more-title">{{ moreSubtext | translate }}</h3>
                </div>
              </div>
              <div class="hover-overlay"></div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .adoption-section {
      width: 100%;
      padding: 1rem 0rem;
    }

    .section-container {
      margin: 0 auto;
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 20px
    }

    .more-card {
      border-radius: 20px;
      background: var(--brand-color);
      color: white;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .more-content {
      position: relative;
      z-index: 1;
      height: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }

    .icon-wrapper {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .more-icon {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }

    .text-content {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .more-text {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.025em;
    }

    .divider {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 999px;
    }

    .more-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
    }

    .hover-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, 
                                rgba(255,255,255,0.1) 0%,
                                rgba(255,255,255,0) 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .more-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                  0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    .more-card:hover .hover-overlay {
      opacity: 1;
    }

    .more-card:hover .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
    }

    @media (max-width: 1200px) {
      .content-wrapper {
        grid-template-columns: 1fr;
      }

      .more-card {
        max-width: none;
        height: 300px;
      }

      .section-header h2 {
        font-size: 2rem;
      }
    }

    @media (max-width: 768px) {
      .adoption-section {
        padding: 3rem 1.25rem;
      }

      .section-header {
        margin-bottom: 2rem;
      }

      .section-header h2 {
        font-size: 1.75rem;
      }

      .section-header p {
        font-size: 1rem;
      }

      .more-content {
        padding: 1.5rem;
      }

      .icon-wrapper {
        width: 80px;
        height: 80px;
      }

      .more-text {
        font-size: 1.125rem;
      }

      .more-title {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .adoption-section {
        padding: 2rem 1rem;
      }

      .section-header h2 {
        font-size: 1.5rem;
      }

      .more-card {
        height: 250px;
      }

      .more-content {
        padding: 1rem;
        gap: 1rem;
      }

      .icon-wrapper {
        width: 60px;
        height: 60px;
      }

      .more-text {
        font-size: 1rem;
      }

      .more-title {
        font-size: 1.125rem;
      }

      .divider {
        width: 40px;
      }
    }
  `]
})
export class AdoptionSectionComponent implements OnInit {
  private router = inject(Router);
  private store = inject(Store);
  private petService = inject(PetsService);

  items$: Observable<Pet[]> = of([]);
  loading =  signal<boolean>(false);

  @Input({ required: true }) moreText = 'See More';
  @Input({ required: true }) moreSubtext = 'View all items';
  @Input({ required: true }) type!: string;
  @Input({ required: true }) isStore!: boolean;

  ngOnInit(): void {
    this.loadPets();
  }
  
  loadPets() {
    this.loading.set(true);
    
    if(this.isStore === true) {
      this.store.dispatch(PetsActions.loadPets({ petType: this.type }));
      this.store.select(selectPets).subscribe((pets) => {
        this.items$ = of(pets);
      })

      this.store.select(selectPetsLoading).subscribe(isLoading => {
        this.loading.set(isLoading);
      });
    } else {
      this.petService.loadPetsByType(this.type).subscribe((res) => {
        this.items$ = of(res.data);
        this.loading.set(false);
      })
    }
  }

  get filteredItems() {
    return this.items$.pipe(map((items) => items.slice(0, 3)));
  }

  onMoreClick() {
    this.router.navigate(['adoption', this.type]);
  }
}