import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section.component';
import { GlobalCardComponent } from '../../shared/components/global-card/global-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PageTitleComponent } from "../../shared/components/page-title/pageTitle.component";
import { AdoptionSectionComponent } from "./adoption-section/adoption-section.component";
import { SliderComponent } from "../../shared/components/slider/slicder.component";
import { CustomButtonComponent } from "../../shared/components/buttons/global-btn.component";
import { AdoptionCardComponent } from "./adoption-section/adoption-card.compontnet";
import { Pet } from '../../core/models/pets/pet.model';
import { PetsService } from '../../core/services/pets/pets.services';
import { Observable, of } from 'rxjs';
import { CardListComponent } from "../../shared/components/static-sections/more-details-section.component";
import { BlogCardsComponent } from "../blogs/blog-card/blog-card.component";

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeroSectionComponent,
    GlobalCardComponent,
    RouterOutlet,
    RouterLink,
    PageTitleComponent,
    AdoptionSectionComponent,
    SliderComponent,
    CustomButtonComponent,
    AdoptionCardComponent,
    CardListComponent,
    BlogCardsComponent
],
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css'],
})
export class AdoptionComponent implements OnInit {
  private router = inject(Router);
  private petService = inject(PetsService);

  pets$!: Observable<Pet[]>
  isOutletActive = false;

  ngOnInit(): void {
    this.petService.loadPetsByType('successfullyAdaped').subscribe((res) => {      
      this.pets$ = of(res.data);
    })  
  }

  onOutletActivated() {
    this.isOutletActive = true;
  }

  onOutletDeactivated() {
    this.isOutletActive = false;
  }

  isCardActive(route: string): boolean {
    return this.router.url === route;
  }

  // Adoption cards data
  adoptions_data = [
    {
      title: 'Pages.Adoption.Adoption_Cards.Card_One',
      image: 'adoption/cards/dog.png',
      type: 'dogs',
      rout: '/adoption/dogs',
    },
    {
      title: 'Pages.Adoption.Adoption_Cards.Card_Two',
      image: 'adoption/cards/cat.png',
      type: 'cats',
      rout: '/adoption/cats',
    },
    {
      title: 'Pages.Adoption.Adoption_Cards.Card_Three',
      image: 'adoption/cards/shelters.png',
      type: 'shelters',
      rout: '/adoption/shelters',
    },
  ];

  // Planning to Adopt
  planning = [
    {
      title: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_One.Title',
      subTitle: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_One.Subtitle',
      image: 'adoption/planning/plan1.png',
    },
    {
      title: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_Two.Title',
      subTitle: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_Two.Subtitle',
      image: 'adoption/planning/plan2.png',
    },
    {
      title: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_Three.Title',
      subTitle: 'Pages.Adoption.Planning_to_Adopt.Cards.Card_Three.Subtitle',
      image: 'adoption/planning/plan3.png',
    }
  ]

}
