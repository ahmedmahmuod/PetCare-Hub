import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/components/page-title/pageTitle.component';
import { TranslateModule } from '@ngx-translate/core';
import { BlogCardsComponent } from './blog-card/blog-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    PageTitleComponent,
    TranslateModule,
    BlogCardsComponent,
    CommonModule,
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {}
