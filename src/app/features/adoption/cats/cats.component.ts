import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../shared/components/page-title/pageTitle.component';
import { AdoptionSectionComponent } from '../adoption-section/adoption-section.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [PageTitleComponent, AdoptionSectionComponent, TranslateModule],
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.css',
})
export class CatsComponent {}
