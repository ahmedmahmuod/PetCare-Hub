import { selectBlogs, selectBlogsLoading } from './../../../stores/blogs-store/blogs.selector';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of, take, tap } from 'rxjs';
import * as BlogsActions from '../../../stores/blogs-store/blogs.actions';
import { SkeletonCardComponent } from "../../../shared/components/skeletons/card-services/skelton-services-card.component";
import { BlogsModel } from '../../../core/models/blogs/blogs.model';

@Component({
    selector: 'app-blog-cards',
    standalone: true,
    imports: [CommonModule, SkeletonCardComponent],
    template: `
      <app-skeleton-services-card *ngIf="(isLoading$ | async) && !isInSlider" />
      <div *ngIf="!(isLoading$ | async)" [ngClass]="layoutClass">
        <div *ngFor="let blog of blogs$ | async" (click)="goToArticle(blog.link)" [ngClass]="cardClass">
          <div class="relative h-60 sm:h-64 w-full">
            <img [src]="blog.plogImage" [alt]="blog.description" class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"/>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
              <h2 class="text-sm sm:text-base text-white font-medium leading-snug">
                {{ blog.description }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    `,
    styles: [`
      @media (max-width: 640px) {
        .mobile-padding {
          padding-left: 1rem;
          padding-right: 1rem;
        }
  
        .card-mobile {
          min-width: 85vw !important;
          max-width: 90vw !important;
        }
      }
    `]
  })
  export class BlogCardsComponent {
    private store = inject(Store);
  
    blogs$ = this.store.select(selectBlogs);
    isLoading$ = this.store.select(selectBlogsLoading);
  
    @Input() isInSlider: boolean = false;
    
    get layoutClass() {
      return this.isInSlider
        ? 'flex gap-4 overflow-x-auto mobile-padding'
        : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4';
    }
  
    get cardClass() {
      return this.isInSlider
        ? 'min-w-[280px] sm:min-w-[300px] max-w-[320px] flex-shrink-0 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer card-mobile'
        : 'w-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer';
    }
  
    constructor() {
      this.blogs$.pipe(take(1)).subscribe(blogs => {
        if (!blogs || blogs.length === 0) {
          this.store.dispatch(BlogsActions.loadBlogs());
        }
      });
    }
  
    goToArticle(link: string) {
      window.open(link, '_self');
    }
  }
  