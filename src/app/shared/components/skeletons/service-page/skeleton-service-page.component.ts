import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skeleton-service-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="booking-container container">
      <div class="image-gallery skeleton">
        <div class="main-image-skeleton"></div>
        <div class="thumbnails">
          <div class="thumbnail-skeleton"></div>
          <div class="thumbnail-skeleton"></div>
          <div class="thumbnail-skeleton"></div>
        </div>
      </div>

      <div class="booking-form skeleton">
        <div class="title-skeleton"></div>
        <div class="price-skeleton">
          <div class="price-text-skeleton"></div>
          <div class="per-night-skeleton"></div>
        </div>

        <div class="form-skeleton">
          <div class="form-group">
            <div class="label-skeleton"></div>
            <div class="input-skeleton"></div>
          </div>

          <div class="form-group">
            <div class="label-skeleton"></div>
            <div class="input-skeleton"></div>
          </div>

          <div class="form-group">
            <div class="label-skeleton"></div>
            <div class="input-skeleton"></div>
          </div>

          <div class="button-skeleton"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shimmer {
      0% {
        background-position: -1000px 0;
      }
      100% {
        background-position: 1000px 0;
      }
    }

    .skeleton {
      position: relative;
    }

    .booking-container {
      display: flex;
      margin: .5rem auto;
      gap: 2rem;
      padding: 1rem;
    }

    .image-gallery {
      flex: 2;
      min-width: 850px;
    }

    .main-image-skeleton {
      width: 100%;
      height: 70vh;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .thumbnails {
      display: flex;
      gap: 1rem;
    }

    .thumbnail-skeleton {
      width: 80px;
      height: 80px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
    }

    .booking-form {
      flex: 1;
      padding: 2rem;
      border-radius: 8px;
    }

    .title-skeleton {
      height: 32px;
      width: 60%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .price-skeleton {
      margin-bottom: 2rem;
    }

    .price-text-skeleton {
      height: 24px;
      width: 70%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .per-night-skeleton {
      height: 24px;
      width: 30%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .label-skeleton {
      height: 16px;
      width: 40%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .input-skeleton {
      height: 48px;
      width: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
    }

    .button-skeleton {
      height: 48px;
      width: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 4px;
      margin-top: 2rem;
    }
  `]
})
export class SkeletonServiceComponent {
}