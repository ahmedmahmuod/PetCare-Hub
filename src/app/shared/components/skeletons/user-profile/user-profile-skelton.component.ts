import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container container mx-auto py-8 animate-pulse">
      <div class="profile-header">
        <div class="skeleton-circle profile-image"></div>

        <div class="profile-info w-full sm:w-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="skeleton-box h-6 w-40 rounded"></div>
            <div class="skeleton-box h-5 w-24 rounded"></div>
          </div>

          <div class="stats-bar">
            <div class="stat-item">
              <div class="skeleton-box h-5 w-12 rounded mb-1"></div>
              <div class="skeleton-box h-4 w-20 rounded"></div>
            </div>
            <div class="stat-item">
              <div class="skeleton-box h-5 w-12 rounded mb-1"></div>
              <div class="skeleton-box h-4 w-20 rounded"></div>
            </div>
            <div class="stat-item">
              <div class="skeleton-box h-5 w-12 rounded mb-1"></div>
              <div class="skeleton-box h-4 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skeleton-box {
      background-color: #e5e7eb;
      position: relative;
      overflow: hidden;
    }

    .skeleton-box::after,
    .skeleton-circle::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: shimmer 1.5s infinite;
    }

    .skeleton-circle {
      background-color: #e5e7eb;
      border-radius: 50%;
      width: 160px;
      height: 160px;
      position: relative;
      overflow: hidden;
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .profile-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2.5rem;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 2rem;
    }

    .profile-info {
      flex: 1;
      min-width: 250px;
    }

    .stats-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }

      .skeleton-circle {
        width: 130px;
        height: 130px;
      }

      .stats-bar {
        justify-content: center;
      }
    }
  `]
})
export class UserProfileSkeletonComponent {}
