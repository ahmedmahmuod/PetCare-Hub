import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, inject } from "@angular/core";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { egyptGovernoratesArrayen } from '../../../core/data/eg-governorates.model';

interface SearchData {
  service: string;
  location: string;
}

@Component({
    selector: 'app-hero-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, FormsModule],
    template: `
        <section class="hero-section">
            <div class="hero-image-container">
                <img [src]="imageUrl" alt="Hero Image" class="hero-image">
                <div class="hero-overlay"></div>
            </div>
            <div class="hero-content">
                <div class="text-content">
                    <h1 class="hero-title">
                        {{ title | translate }}
                    </h1>
                    <p *ngIf="description" class="hero-description">
                        {{ description | translate }}            
                    </p>
                </div>
                
                <!-- Search Filter -->
                <div *ngIf="showFilter" class="search-filter">
                    <div class="filter-container">
                        <div class="filter-grid">
                            <div class="filter-item">
                                <label for="service" class="filter-label">
                                {{'Pages.Services.Filter.Form.Type.Label' | translate}}
                                </label>               
                                <div class="select-wrapper">
                                    <select id="service" [(ngModel)]="selectedService" class="filter-select" (change)="onServiceChange()">
                                        <option value="" selected>
                                            {{'Pages.Services.Filter.Form.Type.Options.Selected' | translate}}
                                        </option>
                                        <option *ngFor="let service of allServicesType" [value]="service">
                                            {{service}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="filter-item">
                                <label for="location" class="filter-label">
                                    {{'Pages.Services.Filter.Form.Location.Label' | translate}}
                                </label>
                                <div class="select-wrapper">
                                    <select id="location" [(ngModel)]="selectedLocation" class="filter-select">
                                        <option value="" selected>
                                            {{'Pages.Services.Filter.Form.Location.Options.Selected' | translate}}
                                        </option>
                                        <option *ngFor="let location of allLocations" [value]="location">
                                            {{location}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="filter-button">
                                <button (click)="onSearchClick()" class="search-button">
                                    <span class="button-content">{{'Pages.Services.Filter.Btn' | translate}}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: [`
        :host {
            display: block;
            position: relative;
        }
        
        .hero-section {
            position: relative;
            height: 100vh;
            min-height: 600px;
            display: flex;
            flex-direction: column;
        }

        .hero-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .hero-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2));
        }

        .hero-content {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2rem 1rem;
            z-index: 1;
        }

        .text-content {
            text-align: center;
            margin-top: auto;
            margin-bottom: auto;
        }

        .hero-title {
            font-size: 2.25rem;
            line-height: 1.5;            
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--brand-seconed-color);
        }

        @media (min-width: 640px) {
            .hero-title {
                font-size: 3rem;
            }
        }

        @media (min-width: 768px) {
            .hero-title {
                font-size: 3.75rem;
            }
        }

        .hero-description {
            font-size: 1.25rem;
            line-height: 1.75rem;
            margin-bottom: 3rem;
            color: var(--seconed-color);
        }

        @media (min-width: 640px) {
            .hero-description {
                font-size: 1.5rem;
                line-height: 2rem;
            }
        }

        @media (min-width: 768px) {
            .hero-description {
                font-size: 1.875rem;
                line-height: 2.25rem;
            }
        }

        .search-filter {
            width: 100%;
            max-width: 80rem;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: -6.5rem;
        }

        .filter-container {
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border-radius: 1.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            padding: 2rem;
        }

        .filter-grid {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        @media (min-width: 768px) {
            .filter-grid {
                flex-direction: row;
            }
        }

        .filter-item {
            flex: 1 1 0%;
        }

        .filter-label {
            display: block;
            font-size: 1.125rem;
            line-height: 1.75rem;
            margin-bottom: 0.8rem;
            color: var(--brand-color);
        }

        .select-wrapper {
            position: relative;
        }

        .filter-select {
            width: 100%;
            padding: 0rem 1rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 0.75rem;
            border: 1px solid var(--brand-color);
            background-color: transparent;
            color: var(--brand-color);
            font-size: 1.125rem;
            line-height: 1.75rem;
            transition: all 0.3s;
            outline: none;
            appearance: none;
            cursor: pointer;
        }

        .filter-select:hover {
            background: var(--third-color);
        }

        .filter-button {
            display: flex;
            align-items: flex-end;
        }

        .search-button {
            width: 100%;
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 1rem;
            padding-bottom: 1rem;
            border-radius: 0.75rem;
            background-color: var(--brand-color);
            color: var(--seconed-color);
            font-size: 1.125rem;
            line-height: 1.75rem;
            font-weight: 500;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            transition: all 0.3s;
        }

        @media (min-width: 768px) {
            .search-button {
                width: auto;
            }
        }

        .search-button:hover {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .search-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .button-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        /* Custom scrollbar for select dropdown */
        select::-webkit-scrollbar {
            width: 8px;
        }

        select::-webkit-scrollbar-track {
            background: var(--brand-color);
            border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb {
            background: red;
            border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb:hover {
            background: var(--brand-seconed-color);
        }

        option {
            background: var(--third-color);
            color: var(--brand-color);
        }
    `]
})
export class HeroSectionComponent implements OnInit {
    // Hero Background
    @Input({ required: true }) imageUrl!: string;
    @Input({ required: true }) title!: string;
    @Input() description?: string;
    @Input() initialService: string = '';
    @Input() initialLocation: string = '';

    // Search Filter
    @Input() showFilter: boolean = false;
    @Output() search = new EventEmitter<SearchData>();

    allLocations = egyptGovernoratesArrayen;

    allServicesType = [
        'Pet Training',
        'Pet Grooming',
        'Pet Boarding',
        'Pet Hotel',
        'Pet Care',
        'Pet Sitting',
        'Pet Taxi',
        'Pet Walking',
    ]

    selectedService = '';
    selectedLocation = '';

    ngOnInit(): void {
        if (this.initialService) {
            this.selectedService = this.initialService;
        }
        if (this.initialLocation) {
            this.selectedLocation = this.initialLocation;
        }
    }
    
    onServiceChange(): void {
        if (!this.selectedService) {
            this.selectedLocation = '';
        }
    }

    onSearchClick() {
        this.search.emit({
            service: this.selectedService,
            location: this.selectedLocation
        });
    }
}