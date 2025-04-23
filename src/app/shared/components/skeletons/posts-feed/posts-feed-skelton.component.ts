import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="post-skeleton-card" *ngFor="let i of [].constructor(3)">
      <div class="skeleton-header">
        <div class="skeleton-avatar shimmer"></div>
        <div class="skeleton-user-info">
          <div class="skeleton-line short shimmer"></div>
          <div class="skeleton-line tiny shimmer"></div>
        </div>
      </div>

      <div class="skeleton-description shimmer"></div>
      <div class="skeleton-image shimmer"></div>

      <div class="skeleton-actions">
        <div class="skeleton-like-icon shimmer"></div>
        <div class="skeleton-like-text shimmer"></div>
      </div>
    </div>
  `,
  styles: [`
    .post-skeleton-card {
      padding: 20px;
      margin-bottom: 24px;
      background: #fff;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .skeleton-header {
      display: flex;
      gap: 10px;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .skeleton-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #e2e2e2;
    }

    .skeleton-user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .skeleton-line {
      height: 12px;
      background: #e2e2e2;
      border-radius: 6px;
    }

    .skeleton-line.short {
      width: 120px;
    }

    .skeleton-line.tiny {
      width: 80px;
    }

    .skeleton-description {
      height: 14px;
      width: 70%;
      margin: 20px auto;
      border-radius: 6px;
      background: #e2e2e2;
    }

    .skeleton-image {
      width: 100%;
      height: 240px;
      border-radius: 12px;
      background: #e2e2e2;
      margin: 16px 0;
    }

    .skeleton-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .skeleton-like-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #e2e2e2;
    }

    .skeleton-like-text {
      height: 12px;
      width: 60px;
      border-radius: 6px;
      background: #e2e2e2;
    }

    /* shimmer effect */
    .shimmer {
      background: linear-gradient(90deg, #e2e2e2 25%, #f6f6f6 50%, #e2e2e2 75%);
      background-size: 200% 100%;
      animation: shimmerMove 1.5s infinite;
    }

    @keyframes shimmerMove {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `]
})
export class PostSkeletonLoaderComponent {}
