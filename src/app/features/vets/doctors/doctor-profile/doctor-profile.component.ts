import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from "../../../../shared/components/reviews/reviews.component";
import { VetsService } from '../../../../core/services/veterinary/veterinary.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DoctorModel } from '../../../../core/models/veterinary/veterinary.model';
import { DoctorProfileSkeletonComponent } from "../../../../shared/components/skeletons/doctor-profile/doc-profile-skelton.component";
import { TranslateModule } from '@ngx-translate/core';
import { ReviewsService } from '../../../../core/services/reviews/reviews.service';
import { ToastService } from '../../../../shared/services/toast-notification/tost-notification.service';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, ReviewsComponent, DoctorProfileSkeletonComponent, TranslateModule ],
  template: `
    <!-- Modal for Image Gallery -->
    <div *ngIf="selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" (click)="closeModal()">
      <div class="relative max-w-4xl w-full">
        <img [src]="selectedImage" class="w-full h-auto rounded-lg" alt="Gallery image">
        <button class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75" (click)="closeModal()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    @if(initialLoading) {
      <app-doctor-profile-skeleton/>
    } @else {
      <div class="min-h-screen" *ngIf="(doctor$ | async) as doctor">
        <div class="container mx-auto px-4 space-y-8">
          <!-- Header Section -->
          <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden mb-8">
            <div class="bg-third-color h-32"></div>
            <div class="px-6 pb-6">
              <div class="flex flex-col md:flex-row gap-6 -mt-16">
                <img [src]="doctor.doctorImage" [alt]="doctor.name" class="w-32 h-32 rounded-xl object-cover border-4 border-third-color shadow-sm">
                <div class="flex-1 pt-4 flex flex-col items-center">
                  <h1 class="text-3xl font-bold text-brand-color mb-6">{{doctor.name}}</h1>
                  <p class="text-fourth-color mb-4">{{doctor.description}}</p>
                  <div class="flex flex-wrap gap-4">
                    <div class="flex items-center gap-x-2 bg-brand-color px-3 py-1 rounded-full">
                        <span class="ml-1 text-seconed-color font-medium">{{doctor.rate}}</span>
                        <span class="text-brand-seconed-color text-xl">★</span>
                        <span class="text-seconed-color">({{doctor.numberOfRate}} {{'Pages.Vets.Doctor_Page.Profile.Header.Reviews' | translate}})</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span *ngFor="let type of doctor.accepted_pet_types" class="px-3 py-1 bg-brand-seconed-color text-seconed-color rounded-full text-sm font-medium">
                        {{type}}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-start max-md:justify-center">
                  <a [href]="'tel:' + doctor.phone" class="bg-brand-color text-seconed-color px-6 py-3 rounded-xl hover:opacity-90  transition-colors flex items-center gap-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {{'Pages.Vets.Doctor_Page.Profile.Header.Call_Btn' | translate}}
                  </a>
                </div>
              </div>
            </div>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
  
              <!-- About Section -->
              <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
                <h2 class="text-2xl font-bold mb-4 text-brand-color">{{'Pages.Vets.Doctor_Page.Profile.About' | translate}}</h2>
                <p class="text-fourth-color whitespace-pre-line leading-relaxed">{{doctor.about}}</p>
              </div>
  
              <!-- Gallery -->
              <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
                <h2 class="text-2xl font-bold mb-4 text-brand-color">{{'Pages.Vets.Doctor_Page.Profile.Gallery.Title' | translate}}</h2>
                @if(doctor.imagesProfile.length >= 1) {
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div *ngFor="let img of doctor.imagesProfile" class="relative group cursor-pointer rounded-xl overflow-hidden"(click)="openImage(img)">
                      <img [src]="img" class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110">
                      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                } @else {
                  <h2 class="text-fourth-color">{{'Pages.Vets.Doctor_Page.Profile.Gallery.Empty' | translate}}</h2>
                } 
                
              </div>
            </div>
  
            <div class="space-y-8">
              <!-- Specializations -->
              <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6">
                <h2 class="text-2xl font-bold mb-4 text-brand-color">{{'Pages.Vets.Doctor_Page.Profile.Specializations' | translate}}</h2>
                <div class="space-y-3">
                  <div *ngFor="let spec of doctor.specialized_in" 
                       class="p-4">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 bg-brand-seconed-color rounded-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-brand-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span class="text-fourth-color font-medium">{{spec}}</span>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Contact Card -->
              <div class="shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-6 text-fourth-color">
                <h2 class="text-2xl font-bold mb-4 text-brand-color">{{'Pages.Vets.Doctor_Page.Profile.Contact_Information' | translate}}</h2>
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{{doctor.phone}}</span>
                  </div>
                  <div class="flex items-center gap-3">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Reviews -->
          <div class="p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <h2 class="text-2xl font-bold mb-4 text-brand-color">{{'Pages.Vets.Doctor_Page.Profile.Reviews' | translate}}</h2>
              <app-reviews (reviewUpdated)="onUpdatingReview($event)" (reviewDeleted)="onDeletedReview($event)" [reviews]="doctor.reviewsOfDoctor" [isLoading]="isLoading" (reviewSubmitted)="addSubmetReview($event)"/>
          </div>
        </div>
      </div>

    } 
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class DoctorProfileComponent implements OnInit {
  // Privets
  private vetService = inject(VetsService);
  private route = inject(ActivatedRoute);
  private reviewsService = inject(ReviewsService);
  private toastService = inject(ToastService);

  // Variables
  doctor$!: Observable<DoctorModel>;
  isLoading: boolean = false;
  initialLoading: boolean = false;
  selectedImage: string | null = null;
  doctorId: string  = '';


  ngOnInit(): void {
    this.isLoading = true;
    this.initialLoading = true;
    this.doctorId = this.route.snapshot.paramMap.get('doctorId') || '';    
    this.vetService.getDoctor(this.doctorId).subscribe((res) => {
      this.doctor$ = of(res);
      this.isLoading = false;
      this.initialLoading = false;
    })  
  }
  
  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeModal() {
    this.selectedImage = null;
  }

  // delete review function
  onDeletedReview(review: any) {    
    this.isLoading = true;
    this.reviewsService.deleteReview(review).subscribe({
      next: (res) => {
        this.vetService.getDoctor(this.doctorId).subscribe((res) => {
          this.doctor$ = of(res);
          this.isLoading = false;
          this.toastService.success('Success!', 'Your rating has been deleted successfully..');
        })
      }, 
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('Error!', err.error?.message || 'An unexpected error occurred. Please try again.');
      },
    })
  }

    // updating review function
  onUpdatingReview(review: any) {    
    this.isLoading = true;

    this.reviewsService.deleteReview(review).subscribe({
      next: (res) => {
        this.vetService.getDoctor(this.doctorId).subscribe((res) => {
          this.doctor$ = of(res);
          this.isLoading = false;
          this.toastService.success('Success!', 'Your rating has been updating successfully..');
        })
      }, 
      error: (err) => {
        this.isLoading = false;
        this.toastService.error('Error!', err.error?.message || 'An unexpected error occurred. Please try again.');
      },
    })
  }


  // add review function
  addSubmetReview(review: any) {    
    this.isLoading = true;
    this.reviewsService.addDoctorReview(review.text, review.rating, this.doctorId).subscribe({
      next: (res) => {
        this.vetService.getDoctor(this.doctorId).subscribe((res) => {
          this.doctor$ = of(res);
          this.toastService.success('Success!', 'Your rating has been added successfully..');
          this.isLoading = false;
        })  

      },
      error: (err) => {
        this.toastService.error('Error!', err.error?.message || 'An unexpected error occurred. Please try again.');
        this.isLoading = false;
      },
    });
  }

}