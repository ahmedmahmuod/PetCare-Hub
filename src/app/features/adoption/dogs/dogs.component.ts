import { Component } from '@angular/core';
import { PageTitleComponent } from "../../../shared/components/page-title/pageTitle.component";
import { AdoptionSectionComponent } from "../adoption-section/adoption-section.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [PageTitleComponent, AdoptionSectionComponent, TranslateModule],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css'
})
export class DogsComponent {

}
