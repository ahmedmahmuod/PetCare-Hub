import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TokenService } from '../../services/token-managment/token-management.service';
import { SectionSpinnerComponent } from "../spinner/spinner-loading.component";
import { RouterLink } from '@angular/router';
import { ToastService } from '../../services/toast-notification/tost-notification.service';
import { take } from 'rxjs';
import { UsersService } from '../../../core/services/user/users.service';
import { ImportsModule } from '../data-table/imports';
import { ConfirmationService } from 'primeng/api';
import { Review } from '../../../core/models/service/service.model';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, SectionSpinnerComponent, RouterLink, ImportsModule],
  providers: [ConfirmationService],
  templateUrl: './reviews.component.html', 
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {  
  @Input() reviews: any[] = [];
  @Input() isLoading: boolean = false;
  @Output() reviewSubmitted = new EventEmitter<any>();
  @Output() reviewUpdated = new EventEmitter<any>();
  @Output() reviewDeleted = new EventEmitter<string>();

  private tokenService = inject(TokenService);
  private toast = inject(ToastService);
  private translate = inject(TranslateService);
  private usersService = inject(UsersService);
  private confirmationService = inject(ConfirmationService);

  hoverRating = 0;
  reviewForm!: FormGroup;
  editForm!: FormGroup;
  isLoggedIn = this.tokenService.isLoggedIn$;
  role = this.tokenService.role$;
  user = this.usersService.user$;
  currentlyEditingId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      review: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.editForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1)]],
      review: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  setRating(star: number): void {
    this.reviewForm.patchValue({ rating: star });
  }

  setEditRating(star: number): void {
    this.editForm.patchValue({ rating: star });
  }

  onSubmit(): void {
    this.role.pipe(take(1)).subscribe((role) => {
      if (role === 'admin') {
        this.toast.info(
          this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Errors.Admin_Error.Title'),
          this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Errors.Admin_Error.Message')
        );
        return;
      }

      if (this.reviewForm.valid) {
        this.reviewSubmitted.emit(this.reviewForm.value);
        this.reviewForm.reset({ rating: 0, review: '' });
        this.hoverRating = 0;
      }
    });
  }

  startEdit(review: any): void {
    // Reset any previously edited review
    this.reviews.forEach(r => r.isEditing = false);
    
    // Set this review to editing mode
    review.isEditing = true;
    this.currentlyEditingId = review.id;
    
    // Initialize the edit form with current values
    this.editForm.patchValue({
      rating: review.rating,
      review: review.review
    });
  }

  saveEdit(review: any): void {    
    if (this.editForm.valid) {
      const updatedReview = {
        id: review.id,
        ...this.editForm.value
      };

      this.reviewUpdated.emit(updatedReview);
      review.isEditing = false;
      this.currentlyEditingId = null;
    }
  }

  cancelEdit(review: any): void {
    review.isEditing = false;
    this.currentlyEditingId = null;
  }

  deleteReview(event: Event, review: Review) {    
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Description_Dialog'),
        header: this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Title_Dialog'),
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        acceptLabel: this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Actions.Yes'),
        rejectLabel: this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Actions.No'),

        accept: () => {
          this.reviewDeleted.emit(review._id);
        }
      });
    
  }

}