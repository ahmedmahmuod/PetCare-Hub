import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewsComponent } from "../../../../shared/components/reviews/reviews.component";
import { SheltersService } from '../../../../core/services/shelters/shelters.service';
import { map, Observable, of } from 'rxjs';
import { ShelterModel } from '../../../../core/models/shelters/shelter.model';
import { ShelterSkeletonComponent } from "../../../../shared/components/skeletons/shelter-page/shelter-page-skelton.component";
import { AdoptionCardComponent } from "../../adoption-section/adoption-card.compontnet";
import { Pet } from '../../../../core/models/pets/pet.model';
import { SliderComponent } from "../../../../shared/components/slider/slicder.component";

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

  shleterId: string  = '';
  activeTab = 'reviews';
  selectedImage: string | null = null;
  currentFilter: 'all' | 'dog' | 'cat' = 'all';

  shelter$!: Observable<ShelterModel>;
  originalShelterPets$: Observable<Pet[]> = of([]);
  filteredShelterPets$: Observable<Pet[]> = of([]);

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

  onFilterChange(filterType: 'all' | 'dog' | 'cat') {
    this.currentFilter = filterType;
    this.filteredShelterPets$ = this.originalShelterPets$.pipe(map (pets => {
        if (!pets) return [];
        return filterType === 'all' ? pets : pets.filter(pet => pet?.type?.toLowerCase() === filterType);
      })
    );
  }
}