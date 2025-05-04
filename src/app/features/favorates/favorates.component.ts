import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoratesService } from '../../core/services/favorates/favorates.service';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsPageSkeltonComponent } from "../../shared/components/skeletons/products-page/products-page-skelton.component";
import { TranslateModule } from '@ngx-translate/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorates.component.html',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductsPageSkeltonComponent, TranslateModule],
})
export class FavoritesComponent implements OnInit {
  private favService = inject(FavoratesService);

  favorites$ = this.favService.favorites$;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.favService.favorites$.pipe(take(1)).subscribe((favorites) => {
      if (!favorites || favorites.length === 0) {
        this.isLoading = true;
        this.favService.fetchFavorites().subscribe(() => {
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  calculateDiscountPercentage(originalPrice: any, afterDiscount: any) {
    return Math.round(((originalPrice - afterDiscount) / originalPrice) * 100);
  }

} 