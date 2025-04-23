import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { SheltersService } from '../../../core/services/shelters/shelters.service';
import { Observable, map } from 'rxjs';
import { ShelterModel } from '../../../core/models/shelters/shelter.model';
import { SkeletonShelterCardComponent } from "../../../shared/components/skeletons/shelter-cards/shelters-skelton.component";
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PageTitleComponent,
    SkeletonShelterCardComponent,
    TranslateModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <section class="container mx-auto px-4">
    <app-page-title [title]="('Pages.Adoption.Adoption_Cards.Card_Three' | translate)"/>

    <div *ngIf="!(shelters$ | async)" class="shelters-grid">
      <app-skeleton-shelter-card *ngFor="let item of [1,2,3,4,5,6]"></app-skeleton-shelter-card>
    </div>

    <div class="shelters-grid" *ngIf="shelters$ | async as shelters">
      <article (click)="onShelterClick(shelter)" *ngFor="let shelter of shelters; trackBy: trackById" class="shelter-card">
        <div class="card-image">
          <img [src]="optimizeImage(shelter.shelterImage)" [alt]="shelter.shelterName" width="400" height="300" loading="lazy"/>
          <div class="card-content">
            <h2>{{ shelter.shelterName }}</h2>
            <div class="rating-container">
              <span class="rate-number">{{ shelter.rate }}</span>
              <div class="stars" dir="ltr">
                <span class="filled-stars" [style.width.%]="(shelter.rate / 5) * 100">★★★★★</span>
                <span class="empty-stars">★★★★★</span>
              </div>
              <span class="reviews">({{ shelter.numberOfRates }})</span>
            </div>
            <p class="description">{{ shelter.description }}</p>
            <p class="address">{{ shelter.locations.address }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
  `,
  styles: [`
    .shelters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 1.5rem 0;
    }

    .shelter-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
      cursor: pointer;
    }

    .shelter-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                  0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .card-image {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: #f3f4f6;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.01);
      transition: transform 0.3s ease;
    }

    .shelter-card:hover .card-image img {
      transform: scale(1.05);
    }

    .card-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.25rem;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.7) 50%,
        transparent 100%
      );
      color: white;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.2;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .rate-number {
      font-weight: 600;
    }

    .stars {
      position: relative;
      display: inline-block;
      font-size: 0.875rem;
      line-height: 1;
    }

    .filled-stars {
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      color: #fbbf24;
    }

    .empty-stars {
      color: rgba(255, 255, 255, 0.3);
    }

    .reviews {
      font-size: 0.75rem;
      opacity: 0.9;
    }

    .description {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      opacity: 0.9;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .address {
      font-size: 0.75rem;
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    @media (max-width: 640px) {
      .shelters-grid {
        gap: 1rem;
        padding: 1rem 0;
      }

      .card-content {
        padding: 1rem;
      }

      h2 {
        font-size: 1.125rem;
      }

      .description {
        -webkit-line-clamp: 1;
      }
    }
  `]
})
export class SheltersListComponent implements OnInit {
  private sheltersService = inject(SheltersService);
  private router = inject(Router);

  shelters$!: Observable<ShelterModel[]>;

  ngOnInit() {
    this.shelters$ = this.sheltersService.getAllShelters().pipe(
      map(res => res.allShelters)
    );
  }

  optimizeImage(url: string): string {
    // Add image optimization parameters to the URL
    if (url.includes('cloudinary')) {
      return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/');
    }
    
    // For non-Cloudinary URLs, we'll use a smaller size and WebP format if supported
    const optimizedUrl = new URL(url);
    optimizedUrl.searchParams.set('width', '800');
    optimizedUrl.searchParams.set('quality', '80');
    optimizedUrl.searchParams.set('format', 'webp');
    return optimizedUrl.toString();
  }

  onShelterClick(shelter: ShelterModel) {
    this.router.navigate(['/adoption/shelters', shelter._id]);
  }

  trackById(index: number, shelter: ShelterModel): string {
    return shelter._id;
  }
}