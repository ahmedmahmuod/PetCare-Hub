import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vets-card-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="team-member animate-pulse">
      <div class="image-container skeleton-circle"></div>
      <div class="skeleton-text name"></div>
      <div class="skeleton-text role"></div>
      <div class="skeleton-button"></div>
    </div>
  `,
  styles: [`
    .team-member {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      text-align: center;
      margin: 1rem;
    }

    .image-container {
      position: relative;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      margin-bottom: 1rem;
      background-color: #e0e0e0;
    }

    .skeleton-circle {
      background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
      background-size: 400% 100%;
    }

    .skeleton-text {
      height: 20px;
      background-color: #e0e0e0;
      border-radius: 4px;
      margin: 0.5rem 0;
    }

    .skeleton-text.name {
      width: 60%;
    }

    .skeleton-text.role {
      width: 40%;
    }

    .skeleton-button {
      width: 80px;
      height: 36px;
      margin-top: 0.75rem;
      border-radius: 8px;
      background-color: #d4d4d4;
    }

    @media (max-width: 768px) {
      .image-container {
        width: 150px;
        height: 150px;
      }

      .skeleton-text.name {
        width: 50%;
        height: 16px;
      }

      .skeleton-text.role {
        width: 30%;
        height: 14px;
      }

      .skeleton-button {
        width: 70px;
        height: 30px;
      }
    }

    .animate-pulse {
      animation: pulse 1.5s infinite ease-in-out;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `]
})
export class VetsCardSkeletonComponent {}
