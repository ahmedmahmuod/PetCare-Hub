import { Observable, of } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { VetsService } from '../../../core/services/veterinary/veterinary.service';
import { VetClinic } from '../../../core/models/veterinary/veterinary.model';
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { VetsCardSkeletonComponent } from "../../../shared/components/skeletons/vets-card/vets-card-skelton.component";
import { VetsCardComponent } from "../vets-card/vets-card.component";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clinics',
  standalone: true, 
  imports: [PageTitleComponent, VetsCardSkeletonComponent, VetsCardComponent, CommonModule, TranslateModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit{
  // Privets
  private vetService = inject(VetsService);

  ngOnInit(): void {
    if (this.clinics.length > 1) {
      return
    }
    this.vetService.loadClinics(); 
  }

  get clinics() {
    return this.vetService.allClinics();
  }

  get isLoading() {
    return this.vetService.loadingClinics();
  }

}
