import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { VetClinic } from '../../../../core/models/veterinary/veterinary.model';
import { VetsService } from '../../../../core/services/veterinary/veterinary.service';
import { Observable, of } from 'rxjs';
import { ClinicProfileSkeletonComponent } from "../../../../shared/components/skeletons/clinic-profile/clinic-profile.component";

@Component({
  selector: 'app-clinic-detail',
  standalone: true,
  imports: [CommonModule, ClinicProfileSkeletonComponent],
  template: `
        @if(loading) {
            <app-clinic-profile-skeleton/>            
        } @else {
            <ng-container *ngIf="clinic$ | async as clinic">
                <div class="container mx-auto">
                  <!-- Hero Section -->
                  <div class="relative h-[70vh] w-full">
                    <img [src]="clinic.vetImage || 'assets/default-clinic.jpg'" [alt]="clinic.vetName" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-black/40"></div>
        
                    <!-- Clinic Info -->
                    <div class="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 to-transparent">
                      <div class="max-w-4xl mx-auto">
                        <div class="flex items-center space-x-4 mb-4">
                          <div class="flex items-center text-yellow-400">
                            <span class="text-2xl mr-1">★</span>
                            <span class="text-white font-medium">{{clinic.rate}}</span>
                            <span class="mx-2 text-white/60">•</span>
                            <span class="text-white/80">{{clinic.numberOfRate}} reviews</span>
                          </div>
                        </div>
                        <h1 class="text-5xl font-bold text-brand-seconed-color mb-4 tracking-tight">{{clinic.vetName}}</h1>
                        <p class="text-xl text-white/90 max-w-3xl">{{clinic.bio}}</p>
                      </div>
                    </div>
                  </div>
        
                  <!-- Content Section -->
                  <div class="max-w-4xl mx-auto px-4 py-16">
                    <div class="grid md:grid-cols-2 gap-16">
                      <!-- Location & Contact -->
                      <div class="space-y-8">
                        <h2 class="text-2xl font-bold text-brand-color">Location & Contact</h2>
                        
                        <!-- Address Card -->
                        <div class="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                          <div class="flex items-start">
                            <div class="flex-shrink-0 w-12 h-12 bg-brand-seconed-color rounded-xl flex items-center justify-center">
                              <svg class="w-6 h-6 text-brand-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                              </svg>
                            </div>
                            <div class="ml-4">
                              <h3 class="text-lg font-semibold text-brand-color">Visit Us</h3>
                              <p class="mt-2 text-fourth-color">{{clinic.locations.address}}</p>
                            </div>
                          </div>
                        </div>
        
                        <!-- Phone Card -->
                        <div class="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                          <div class="flex items-start">
                            <div class="flex-shrink-0 w-12 h-12 bg-brand-seconed-color rounded-xl flex items-center justify-center">
                              <svg class="w-6 h-6 text-brand-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                              </svg>
                            </div>
                            <div class="ml-4">
                              <h3 class="text-lg font-semibold text-brand-color">Contact</h3>
                              <a href="tel:{{clinic.callNumber}}" 
                                 class="mt-2 inline-block text-fourth-color hover:text-brand-seconed-color font-medium">
                                {{clinic.callNumber}}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <!-- Reviews Section -->
                      <div>
                        <h2 class="text-2xl font-bold text-brand-color mb-8">What People Say</h2>
                        <div class="bg-gray-50 rounded-2xl p-8 relative">
                          <div class="absolute -top-4 left-8 bg-brand-seconed-color text-brand-color px-4 py-2 rounded-full font-medium flex items-center">
                            <span class="text-xl mr-1">★</span>
                            {{clinic.rate}}
                          </div>
                          
                          <blockquote class="text-fourth-color text-lg mt-4">
                            "{{clinic.review}}"
                          </blockquote>
                          
                          <div class="mt-6 pt-6 border-t border-gray-200">
                            <div class="flex items-center justify-between">
                              <div class="text-sm text-fourth-color">Based on {{clinic.numberOfRate}} reviews</div>
                              <div class="flex">
                                @for (star of [1,2,3,4,5]; track star) {
                                  <span class="text-yellow-400 text-lg">★</span>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </ng-container>
        }
  `
})
export class ClinicDetailComponent implements OnInit {
    private vetService = inject(VetsService)
    private route = inject(ActivatedRoute)

    clinic$!: Observable<VetClinic>;
    loading: boolean = false;

    ngOnInit() {
        const clinicId = this.route.snapshot.paramMap.get('clinicsId') ?? '';
        this.loading = true;
        this.vetService.getClinic(clinicId).subscribe((res) => {
            this.clinic$ = of(res);
            this.loading = false;
        })        
    }

}