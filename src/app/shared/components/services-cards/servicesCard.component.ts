import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceModel } from '../../../core/models/service/service.model';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services-card',
  standalone: true,
  imports: [ CommonModule, TranslateModule ],
  template: `
    <ng-container *ngIf="services as services">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container w-full mx-auto">
        <div *ngFor="let service of services" (click)="onServiceClick(service)" class="sm:m-0 mx-5 flex flex-col bg-third-color cursor-pointer rounded-3xl border-2 border-fourth-color transition-all ease-in-out hover:-translate-y-1 hover:bg-brand-color group overflow-hidden">
          <div class="relative w-full h-64">
            <img class="w-full h-full object-cover" [src]="service.serviceImage" [alt]="service.serviceType" loading="lazy"/>
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <div class="flex">
                <ng-container *ngFor="let star of [1,2,3,4,5]">
                  <svg [class.text-yellow-500]="star <= service.rate" [class.text-gray-300]="star > service.rate" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </ng-container>
              </div>
              <span class="font-medium text-brand-color">{{service.rate}}</span>
            </div>
          </div>
          
          <div class="p-4">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-bold text-brand-color group-hover:text-brand-seconed-color transition-all">
                {{service.serviceType}}
              </h3>
              <div class="flex items-baseline">
                <span class="font-bold text-brand-color group-hover:text-brand-seconed-color">
                  {{'$'+ service.price }}
                </span>
                <span class="text-fourth-color group-hover:text-seconed-color mx-1">-</span>
                <span class="text-sm text-fourth-color group-hover:text-seconed-color ml-1">
                  {{ service.pricePer === 'night' ? ('Pages.Services.ServiceCard.Type.Night' | translate) : 
                    service.pricePer === 'course' ? ('Pages.Services.ServiceCard.Type.Course' | translate) : 
                    service.pricePer === 'walk' ? ('Pages.Services.ServiceCard.Type.Walk' | translate) :
                    service.pricePer === 'ride' ?  ('Pages.Services.ServiceCard.Type.Ride' | translate) : '' }}
                </span>
              </div>
            </div>
            
            <div class="flex">
              <svg class="w-4 h-4 text-fourth-color group-hover:text-seconed-color" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <p class="ml-1 text-sm text-fourth-color group-hover:text-seconed-color">
                {{service.city}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export class ServicesCardComponent {
  private router = inject(Router);

@Input() services: ServiceModel[] = [];
@Input() isLoading: boolean = false;


  onServiceClick(service: ServiceModel) {        
    this.router.navigate(['/services', service.serviceProfile._id]);
  }
}