import { Component } from '@angular/core';
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { CardListComponent } from "../../../shared/components/static-sections/more-details-section.component";
import { VetsSectionComponent } from "../vets-section/vets-section.component";
import { CustomButtonComponent } from "../../../shared/components/buttons/global-btn.component";

@Component({
  selector: 'app-vets-home',
  standalone: true,
  imports: [PageTitleComponent, CardListComponent, VetsSectionComponent, CustomButtonComponent],
  templateUrl: './vets-home.component.html',
  styleUrl: './vets-home.component.css'
})
export class VetsHomeComponent {
    // Providing our best veterinary Services
    providing_data = [
      {
        title: 'Pages.Vets.Static_Section.Cards.Card_One.Title',
        subTitle: 'Pages.Vets.Static_Section.Cards.Card_One.Subtitle',
        image: 'veterinary/static-details-section/static-details1.png',
      },
      {
        title: 'Pages.Vets.Static_Section.Cards.Card_Two.Title',
        subTitle: 'Pages.Vets.Static_Section.Cards.Card_Two.Subtitle',
        image: 'veterinary/static-details-section/static-details2.png',
      },
      {
        title: 'Pages.Vets.Static_Section.Cards.Card_Three.Title',
        subTitle: 'Pages.Vets.Static_Section.Cards.Card_Three.Subtitle',
        image: 'veterinary/static-details-section/static-details3.png',
      }
    ]

    // Our best doctors section data
    doctorsMembers = [
        {
          imageUrl: 'veterinary/doctors/doc1.png',
          name: 'Daria Andaloro',
          role: 'Veterinary Technician'
        },
        {
            imageUrl: 'veterinary/doctors/doc2.png',
            name: 'Michael Brian',
          role: 'Medicine Specialist'
        },
        {
            imageUrl: 'veterinary/doctors/doc3.png',
            name: 'Esther Howard',
          role: 'Food Technician'
        },
        {
            imageUrl: 'veterinary/doctors/doc4.png',
            name: 'Lizay Arianya',
          role: 'Veterinary Technician'
        }
    ];

    // Our best clinics section data
    clinicsMembers = [
        {
          imageUrl: 'veterinary/clinics/clinic1.png',
          name: 'Petsy Zone',
          role: 'Pet clinic'
        },
        {
          imageUrl: 'veterinary/clinics/clinic2.png',
          name: 'Pet Cure',
          role: 'Veterinary clinic'
        },
        {
          imageUrl: 'veterinary/clinics/clinic3.png',
          name: 'Orange',
          role: 'Veterinary clinic'
        },
        {
          imageUrl: 'veterinary/clinics/clinic4.png',
          name: 'Grand Vet',
          role: 'Pet clinic'
        }
    ];
}
