import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adoption-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-container">
      <div *ngFor="let item of skeletonItems" class="skeleton-card">
        <div class="skeleton-image pulse"></div>
        <div class="skeleton-content">
          <div class="skeleton-title pulse"></div>
          <div class="skeleton-badge pulse"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
      width: 100%;
      padding: 1rem;
    }

    .skeleton-card {
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      border-radius: 16px;
      overflow: hidden;
      aspect-ratio: 4/4;
    }

    .skeleton-image {
      width: 100%;
      height: 70%;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .skeleton-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 0 8px;
    }

    .skeleton-title {
      width: 70%;
      height: 24px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 4px;
    }

    .skeleton-badge {
      width: 30%;
      height: 20px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      border-radius: 10px;
      align-self: flex-end;
    }

    .pulse {
      animation: pulse 1.5s infinite, shimmer 2s infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    @media (max-width: 768px) {
      .skeleton-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .skeleton-container {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
      
      .skeleton-card {
        aspect-ratio: 2/3;
      }
    }
  `]
})
export class AdoptionSkeletonComponent {
  @Input() count: number = 12;
  skeletonItems: number[] = [];

  ngOnInit() {
    this.skeletonItems = Array(this.count).fill(0).map((x, i) => i);
  }
}