import { Component } from '@angular/core';

@Component({
  selector: 'app-shelter-details-skeleton',
  standalone: true,
  template: `
    <div class="shelter-details-skeleton">
      <!-- Hero Section Skeleton -->
      <div class="hero-section-skeleton">
        <div class="hero-image-skeleton"></div>
        <div class="hero-content-skeleton">
          <div class="title-skeleton"></div>
          <div class="rating-skeleton">
            <div class="stars-skeleton"></div>
            <div class="rate-number-skeleton"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Skeleton -->
      <div class="content-container-skeleton">
        <!-- Info Card Skeleton -->
        <div class="info-card-skeleton">
          <div class="info-grid-skeleton">
            <div class="info-item-skeleton">
              <div class="icon-skeleton"></div>
              <div class="text-skeleton">
                <div class="heading-skeleton"></div>
                <div class="content-skeleton"></div>
              </div>
            </div>
            <div class="info-item-skeleton">
              <div class="icon-skeleton"></div>
              <div class="text-skeleton">
                <div class="heading-skeleton"></div>
                <div class="content-skeleton"></div>
              </div>
            </div>
            <div class="info-item-skeleton">
              <div class="icon-skeleton"></div>
              <div class="text-skeleton">
                <div class="heading-skeleton"></div>
                <div class="content-skeleton"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- About Section Skeleton -->
        <div class="section-skeleton">
          <div class="section-title-skeleton"></div>
          <div class="paragraph-skeleton"></div>
          <div class="paragraph-skeleton" style="width: 80%"></div>
          <div class="paragraph-skeleton" style="width: 60%"></div>
        </div>

        <!-- Gallery Section Skeleton -->
        <div class="section-skeleton">
          <div class="section-title-skeleton"></div>
          <div class="gallery-masonry-skeleton">
            <div class="gallery-item-skeleton" style="grid-column: span 2"></div>
            <div class="gallery-item-skeleton"></div>
            <div class="gallery-item-skeleton"></div>
            <div class="gallery-item-skeleton"></div>
            <div class="gallery-item-skeleton"></div>
          </div>
        </div>

        <!-- Tabs Section Skeleton -->
        <div class="section-skeleton">
          <div class="section-title-skeleton"></div>
          <div class="tabs-skeleton">
            <div class="tab-skeleton active"></div>
            <div class="tab-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Base Skeleton Styles */
    .shelter-details-skeleton {
      width: 100%;
    }

    /* Animation for Skeleton Loading */
    @keyframes shimmer {
      0% { background-position: -468px 0 }
      100% { background-position: 468px 0 }
    }

    .hero-image-skeleton,
    .title-skeleton,
    .stars-skeleton,
    .rate-number-skeleton,
    .icon-skeleton,
    .heading-skeleton,
    .content-skeleton,
    .section-title-skeleton,
    .paragraph-skeleton,
    .gallery-item-skeleton,
    .tab-skeleton {
      background: linear-gradient(to right, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
      background-size: 800px 104px;
      animation: shimmer 1.5s infinite linear;
      border-radius: 4px;
    }

    /* Hero Section Skeleton */
    .hero-section-skeleton {
      position: relative;
      width: 100%;
      height: 60vh;
      min-height: 400px;
      max-height: 800px;
      overflow: hidden;
    }

    .hero-image-skeleton {
      width: 100%;
      height: 100%;
    }

    .hero-content-skeleton {
      position: absolute;
      bottom: 44px;
      left: 0;
      right: 0;
      padding: 2rem;
      text-align: center;
    }

    .title-skeleton {
      width: 60%;
      height: 50px;
      margin: 0 auto 1rem;
    }

    .rating-skeleton {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stars-skeleton {
      width: 150px;
      height: 24px;
    }

    .rate-number-skeleton {
      width: 100px;
      height: 16px;
    }

    /* Main Content Container Skeleton */
    .content-container-skeleton {
      max-width: 1400px;
      margin: -4rem auto 0;
      padding: 0 2rem 4rem;
      position: relative;
      z-index: 2;
    }

    /* Info Card Skeleton */
    .info-card-skeleton {
      background: #fff;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      margin-bottom: 3rem;
    }

    .info-grid-skeleton {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .info-item-skeleton {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .icon-skeleton {
      width: 48px;
      height: 48px;
      border-radius: 12px;
    }

    .text-skeleton {
      flex: 1;
    }

    .heading-skeleton {
      width: 80px;
      height: 18px;
      margin-bottom: 0.5rem;
    }

    .content-skeleton {
      width: 100%;
      height: 14px;
    }

    /* Sections Skeleton */
    .section-skeleton {
      margin-bottom: 4rem;
    }

    .section-title-skeleton {
      width: 200px;
      height: 36px;
      margin-bottom: 1rem;
    }

    .paragraph-skeleton {
      width: 100%;
      height: 16px;
      margin-bottom: 12px;
    }

    /* Gallery Skeleton */
    .gallery-masonry-skeleton {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    .gallery-item-skeleton {
      break-inside: avoid;
      margin-bottom: 1.5rem;
      aspect-ratio: 1/1;
    }

    .gallery-item-skeleton:first-child {
      grid-column: span 2;
      aspect-ratio: 2/1;
    }

    /* Tabs Skeleton */
    .tabs-skeleton {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }

    .tab-skeleton {
      width: 120px;
      height: 40px;
      margin-right: 10px;
      
      &.active {
        background: #e0e0e0;
      }
    }

    /* Responsive Adjustments for Skeleton */
    @media (max-width: 1200px) {
      .content-container-skeleton {
        max-width: 100%;
        padding: 0 1.5rem 3rem;
      }

      .info-grid-skeleton {
        grid-template-columns: repeat(2, 1fr);
      }

      .gallery-masonry-skeleton {
        grid-template-columns: repeat(2, 1fr);
      }

      .gallery-item-skeleton:first-child {
        grid-column: auto;
        aspect-ratio: 1/1;
      }
    }

    @media (max-width: 768px) {
      .hero-section-skeleton {
        height: 50vh;
        min-height: 350px;
      }

      .info-grid-skeleton {
        grid-template-columns: 1fr;
      }

      .gallery-masonry-skeleton {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 576px) {
      .hero-section-skeleton {
        height: 45vh;
        min-height: 300px;
      }

      .content-container-skeleton {
        margin-top: -3rem;
        padding-bottom: 2rem;
      }

      .section-title-skeleton {
        height: 28px;
      }
    }

    @media (max-width: 400px) {
      .hero-section-skeleton {
        min-height: 250px;
      }

      .title-skeleton {
        height: 40px;
      }

      .content-container-skeleton {
        margin-top: -2rem;
      }
    }
  `]
})
export class ShelterSkeletonComponent {}