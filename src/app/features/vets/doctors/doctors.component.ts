import { Component, inject, OnInit } from '@angular/core';
import { VetsService } from '../../../core/services/veterinary/veterinary.service';
import { Observable, of } from 'rxjs';
import { DoctorModel } from '../../../core/models/veterinary/veterinary.model';
import { CommonModule } from '@angular/common';
import { VetsCardComponent } from "../vets-card/vets-card.component";
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { VetsCardSkeletonComponent } from "../../../shared/components/skeletons/vets-card/vets-card-skelton.component";

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, VetsCardComponent, PageTitleComponent, VetsCardSkeletonComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  // Privets
  private vetSerivce = inject(VetsService)

  // Variables 
  doctors$: Observable<DoctorModel[]> = of([])
  isLoading: boolean = false;

  // ng OnInit 
  ngOnInit(): void {
    this.isLoading = true;
    this.vetSerivce.getAllDoctors().subscribe((res) => {
      this.doctors$ = of(res.doctors);
      this.isLoading = false;
      
    })  
  }
}
