import { Component, inject } from '@angular/core';
import { HeroSectionComponent } from "../../shared/components/hero-section/hero-section.component";
import { GlobalCardComponent } from "../../shared/components/global-card/global-card.component";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-vets',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, GlobalCardComponent, RouterOutlet, TranslateModule],
  templateUrl: './vets.component.html',
  styleUrl: './vets.component.css'
})
export class VetsComponent {
  private router = inject(Router);

  isOutletActive = false;

  onOutletActivated() {
    this.isOutletActive = true;
  }

  onOutletDeactivated() {
    this.isOutletActive = false;
  }

  isCardActive(route: string): boolean {
    return this.router.url === route;
  }

  navigateWithoutScroll(route: string) {
    const currentScrollY = window.scrollY;
    this.router.navigate([route]).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: currentScrollY });
      }, 0);
    });
  }

    // Vets cards data
    vets_cards_data = [
      {
        title: 'Pages.Vets.Cards.Card_One',
        image: 'veterinary/cards/doctors.png',
        type: 'doctors',
        rout: '/veterinary/doctors',
      },
      {
        title: 'Pages.Vets.Cards.Card_Two',
        image: 'veterinary/cards/clinics.png',
        type: 'clinics',
        rout: '/veterinary/clinics',
      },
    ];


    clickToRoute (route: string) {
      this.router.navigate([route]);
    }

}
