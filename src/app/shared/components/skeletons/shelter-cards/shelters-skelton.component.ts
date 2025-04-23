import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-shelter-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-card">
      <div class="skeleton-image pulse"></div>
      <div class="skeleton-overlay">
        <div class="skeleton-content">
          <div class="skeleton-title pulse"></div>
          <div class="skeleton-rating">
            <div class="skeleton-rate pulse"></div>
            <div class="skeleton-stars pulse"></div>
            <div class="skeleton-reviews pulse"></div>
          </div>
          <div class="skeleton-details pulse"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      height: 300px;
      position: relative;
    }

    .skeleton-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
    }

    .skeleton-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 20px;
      background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%);
    }

    .skeleton-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton-title {
      height: 24px;
      width: 70%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton-rating {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .skeleton-rate {
      width: 30px;
      height: 16px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton-stars {
      width: 80px;
      height: 16px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton-reviews {
      width: 40px;
      height: 16px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton-details {
      height: 16px;
      width: 90%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .pulse {
      animation: pulse 1.5s infinite, shimmer 2s infinite;
    }

    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Responsive adjustments */
    @media (max-width: 1200px) {
      .skeleton-card {
        height: 280px;
      }
    }

    @media (max-width: 768px) {
      .skeleton-card {
        height: 320px;
      }
      
      .skeleton-overlay {
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .skeleton-card {
        height: 260px;
      }
    }
  `]
})
export class SkeletonShelterCardComponent {}