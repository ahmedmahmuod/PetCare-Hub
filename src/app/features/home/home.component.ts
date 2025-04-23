import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ServicesService } from '../../core/services/services/services.service';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { PageTitleComponent } from "../../shared/components/page-title/pageTitle.component";
import { HeroSectionComponent } from "../../shared/components/hero-section/hero-section.component";
import { SliderComponent } from "../../shared/components/slider/slicder.component";
import { CustomButtonComponent } from "../../shared/components/buttons/global-btn.component";
import { BlogCardsComponent } from "../blogs/blog-card/blog-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, PageTitleComponent, HeroSectionComponent, SliderComponent, CustomButtonComponent, BlogCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Injecting
  private servicesServices = inject(ServicesService);
  private store = inject(Store);

  // Services data
  services = [
    {
      title: 'Pages.Home.Services.Card_One',
      image: 'services/veterinary1.png',
      type: 'Pet Training',
    },
    {
      title: 'Pages.Home.Services.Card_Two',
      image: 'services/veterinary2.png',
      type: 'Pet Boarding',
    },
    {
      title: 'Pages.Home.Services.Card_Three',
      image: 'services/veterinary3.png',
      type: 'Pet Grooming',
    },
    {
      title: 'Pages.Home.Services.Card_Four',
      image: 'services/veterinary4.png',
      type: 'Pet Walking',
    },
  ];


}
