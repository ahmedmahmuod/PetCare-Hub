import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  template: `
    <div class="reviews-container">
      <!-- Reviews List -->
      <div class="reviews-list" *ngIf="reviews.length > 0">
        <div *ngFor="let review of reviews" class="review-item">
          <img [src]="review.user?.profileImage || 'assets/images/default-avatar.png'" 
               alt="User" 
               class="review-avatar" />
          <div class="review-content">
            <div class="review-header">
              <span class="review-author">{{ review.user?.name || review.name }}</span>
              <span class="review-date">{{ review.createdAt | date }}</span>
            </div>
            <div class="review-stars">
              <span *ngFor="let star of [1,2,3,4,5]" [class.active]="star <= review.rating">★</span>
            </div>
            <p class="review-text">{{ review.review }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div *ngIf="reviews.length === 0" class="empty-reviews">
        <p>{{ 'Reviews.Empty' | translate }}</p>
      </div>

      <!-- Review Form (if user is logged in) -->
      <form *ngIf="isLoggedIn" [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="review-form">
        <h3>{{ 'Pages.Services.Single_Service.Tabs.Reviews_Page.Title' | translate }}</h3>
        
        <!-- Rating -->
        <div class="rating-input">
          <div class="stars-selector">
            <span *ngFor="let star of [1,2,3,4,5]" 
                  (click)="setRating(star)" 
                  (mouseenter)="hoverRating = star" 
                  (mouseleave)="hoverRating = 0" 
                  [class.active]="star <= (hoverRating || reviewForm.value.rating)">
              ★
            </span>
          </div>
        </div>

        <!-- Review Text -->
        <div class="form-group">
          <textarea formControlName="text" 
                    [placeholder]="'Pages.Services.Single_Service.Tabs.Reviews_Page.Placeholder' | translate" 
                    class="review-textarea"></textarea>
          <small *ngIf="reviewForm.get('text')?.invalid && reviewForm.get('text')?.touched" 
                 class="error-message">
            {{ 'Pages.Services.Single_Service.Tabs.Reviews_Page.Error' | translate }}
          </small>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button" [disabled]="reviewForm.invalid">
          {{ 'Pages.Services.Single_Service.Tabs.Reviews_Page.Btn' | translate }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    /* Main Container */
    .reviews-container {
      display: flex;
      gap: 2rem;
      flex-wrap: wrap;
    }

    /* Reviews List Section */
    .reviews-list {
      flex: 1;
      min-width: 0;
    }

    /* Single Review Item */
    .review-item {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;
      margin-bottom: 1rem;
    }

    .review-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
      flex-shrink: 0;
    }

    .review-content {
      flex: 1;
      min-width: 0;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .review-author {
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
    }

    .review-date {
      color: var(--fourth-color);
      font-size: 0.8rem;
    }

    .review-stars span {
      color: var(--third-color);
      font-size: 1.1rem;
    }

    .review-stars span.active {
      color: var(--brand-seconed-color);
    }

    .review-text {
      color: var(--fourth-color);
      line-height: 1.5;
      font-size: 0.9rem;
      word-break: break-word;
    }

    /* Empty State */
    .empty-reviews {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    /* Review Form */
    .review-form {
      padding: 1.5rem;
      width: 350px;
      height: fit-content;
    }

    .review-form h3 {
      margin-bottom: 1rem;
      color: var(--brand-color);
      font-size: 1.5rem;
    }

    /* Rating Stars */
    .stars-selector {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .stars-selector span {
      font-size: 1.8rem;
      color: #ddd;
      cursor: pointer;
      transition: all 0.2s;
    }

    .stars-selector span.active {
      color: var(--brand-seconed-color);
      transform: scale(1.1);
    }

    /* Textarea */
    .review-textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      min-height: 120px;
      resize: vertical;
      font-family: inherit;
      font-size: 0.9rem;
      transition: border 0.3s;
      background-color: var(--seconed-color);
      color: var(--brand-color)
    }

    .review-textarea:focus {
      outline: none;
      border-color: var(--brand-color);
      box-shadow: 0 0 0 2px rgba(var(--brand-color), 0.2);
    }

    /* Error Message */
    .error-message {
      color: #f44336;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: block;
    }

    /* Submit Button */
    .submit-button {
      background-color: var(--brand-color);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
      width: 100%;
      margin-top: 0.5rem;
    }

    .submit-button:hover {
      background-color: var(--brand-seconed-color);
    }

    .submit-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Responsive Adjustments */
    @media (max-width: 992px) {
      .reviews-container {
        flex-direction: column;
      }

      .review-form {
        width: 100%;
        order: -1;
        margin-bottom: 2rem;
      }
    }

    @media (max-width: 768px) {
      .review-item {
        flex-direction: column;
      }

      .review-avatar {
        align-self: center;
        margin-bottom: 0.5rem;
      }

      .review-header {
        flex-direction: column;
        align-items: center;
      }

      .review-stars {
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .review-form {
        padding: 1rem;
      }

      .stars-selector span {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ReviewsComponent {
  @Input() reviews: any[] = [];
  @Input() isLoggedIn: boolean = false;
  @Output() reviewSubmitted = new EventEmitter<any>();

  hoverRating = 0;
  reviewForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      text: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  setRating(star: number): void {
    this.reviewForm.patchValue({ rating: star });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.reviewSubmitted.emit(this.reviewForm.value);
      this.reviewForm.reset({ rating: 0, text: '' });
      this.hoverRating = 0;
    }
  }
}