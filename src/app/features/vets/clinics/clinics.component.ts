import { Observable, of } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VetsService } from '../../../core/services/veterinary/veterinary.service';
import { VetClinic } from '../../../core/models/veterinary/veterinary.model';
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { VetsCardSkeletonComponent } from "../../../shared/components/skeletons/vets-card/vets-card-skelton.component";
import { VetsCardComponent } from "../vets-card/vets-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinics',
  standalone: true, 
  imports: [PageTitleComponent, VetsCardSkeletonComponent, VetsCardComponent, CommonModule],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.css'
})
export class ClinicsComponent implements OnInit{
  // Privets
  private vetService = inject(VetsService);

  // Variables
  clinics$!: Observable<VetClinic[]>;
  loading: boolean = false;

  // call api by ngOnInit
  ngOnInit(): void {
    this.loading = true;
    this.vetService.getAllClinics().subscribe((res) =>{
      this.clinics$ = of(res);
      this.loading = false;
      
    })
  }


}
