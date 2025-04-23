import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VetsCardComponent } from "../vets-card/vets-card.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-vets-section',
  standalone: true,
  imports: [ CommonModule, VetsCardComponent, TranslateModule ],
  template: `
    <section class="team-section">
      <div class="team-grid">
        <app-vets-card [router]="''" [darkMode]="borderDark" [borderDark]="borderDark" *ngFor="let member of teamMembers" [imageUrl]="member.imageUrl" [name]="member.name" [role]="member.role"/>
      </div>
    </section>
  `,
  styles: [`
    .team-section {
      padding: 2rem;
      max-width: 2000px;
    }

    .team-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .team-section {
        padding: 1rem;
      }

      .team-grid {
        gap: 1rem;
      }
    }
  `]
})
export class VetsSectionComponent {
  @Input() borderDark: boolean = true;  
  @Input({ required: true }) teamMembers: any[] = [];

}