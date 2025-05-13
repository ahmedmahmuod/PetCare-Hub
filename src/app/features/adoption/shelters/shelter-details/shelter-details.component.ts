import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReviewsComponent } from "../../../../shared/components/reviews/reviews.component";
import { SheltersService } from '../../../../core/services/shelters/shelters.service';
import { map, Observable, of } from 'rxjs';
import { ShelterModel } from '../../../../core/models/shelters/shelter.model';
import { ShelterSkeletonComponent } from "../../../../shared/components/skeletons/shelter-page/shelter-page-skelton.component";
import { AdoptionCardComponent } from "../../adoption-section/adoption-card.compontnet";
import { Pet } from '../../../../core/models/pets/pet.model';
import { SliderComponent } from "../../../../shared/components/slider/slicder.component";
import { ReviewsService } from '../../../../core/services/reviews/reviews.service';
import { ToastService } from '../../../../shared/services/toast-notification/tost-notification.service';
import { Review } from '../../../../core/models/service/service.model';

@Component({
  selector: 'app-shelter-details',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, ReviewsComponent, ShelterSkeletonComponent, AdoptionCardComponent, SliderComponent],
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.css']
})
export class ShelterDetailsComponent implements OnInit {
  private sheltersService = inject(SheltersService);
  private route = inject(ActivatedRoute);
  private reviewsService = inject(ReviewsService);
  private toastService = inject(ToastService);
  private translate = inject(TranslateService);

  shleterId: string  = '';
  activeTab = 'reviews';
  selectedImage: string | null = null;
  currentFilter: 'all' | 'dog' | 'cat' = 'all';

  shelter$!: Observable<ShelterModel>;
  originalShelterPets$: Observable<Pet[]> = of([]);
  isLoading: boolean = false;

  // Image Modal
  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }

  // ngOnInit
  ngOnInit() {
    this.shleterId = this.route.snapshot.paramMap.get('shelterId') || '';
    this.sheltersService.getShelterById(this.shleterId).subscribe((res) => {
      this.shelter$ = of(res);
    })

    this.sheltersService.getPetsOfShelter(this.shleterId).subscribe((res) => {
        this.originalShelterPets$ = of(res);
    })
  }

  // deleting review func
  onDeletedReview(review: any) {    
    this.isLoading = true;
    this.reviewsService.deleteReview(review).subscribe({
      next: (res) => {
        this.sheltersService.getShelterById(this.shleterId).subscribe({
          next: (data) => {
            this.shelter$ = of(data);
            this.isLoading = false;
          this.toastService.success(this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Toasts.Success.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Toasts.Success.Message'));
          }
        })
      }, 
      error: (err) => {
        this.isLoading = false;
          this.toastService.error(this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Toasts.Errors.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Confirm_Delete.Toasts.Errors.Message'));
      },
    })
  }

  // updating review function
  onUpdatingReview(review: any) {    
    this.isLoading = true;
    
    this.reviewsService.updateReview(review).subscribe({
      next: (res) => {
        this.sheltersService.getShelterById(this.shleterId).subscribe({
          next: (data) => {
            this.shelter$ = of(data);
            this.isLoading = false;
          this.toastService.success(this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Update_Dialog.Toasts.Success.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Update_Dialog.Toasts.Success.Message'));
          }
        })
      }, 
      error: (err) => {
        this.isLoading = false;
          this.toastService.error(this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Update_Dialog.Toasts.Errors.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Reviews_Page.Dialogs.Update_Dialog.Toasts.Errors.Message'));
      },
    })
  }

  // add review function
  addSubmetReview(review: any) {    
    this.isLoading = true;
    this.reviewsService.addShelterReview(review.text, review.rating, this.shleterId).subscribe({
      next: (res) => {
        this.sheltersService.getShelterById(this.shleterId).subscribe({
          next: (data) => {
            this.shelter$ = of(data);
            this.isLoading = false;
          this.toastService.success(this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Successful.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Successful.Message'));
          }
        })
      },
      error: (err) => {
        this.isLoading = false;
        this.toastService.error(this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Errors.User_Error.Title'), this.translate.instant('Pages.Services.Single_Service.Tabs.Toasts.Errors.User_Error.Message'))
      },
    });
  }

}