import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="favorite-icon" [class.active]="isActive" (click)="toggleFavorite()" aria-label="Toggle favorite">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path [attr.fill]="isActive ? 'var(--brand-color)' : 'none'" stroke="currentColor" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  `,
  styles: [`
    .favorite-icon {
      position: absolute;
      top: -8px;
      right: -26px;
      inset-inline-end: -8px;
      background: white;
      color: var(--brand-color);
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: all 0.2s ease;
      z-index: 9999;
    }

    .favorite-icon:hover {
      transform: scale(1.1);
    }
  `]
})
export class FavoriteIconComponent {
  @Input() isActive = false;
  @Output() favoriteChange = new EventEmitter<boolean>();

  toggleFavorite() {
    this.isActive = !this.isActive;
    this.favoriteChange.emit(this.isActive);
  }
}