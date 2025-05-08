import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/products/product.model';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/services/products/products.service';
import { BehaviorSubject, map } from 'rxjs';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { ProductsPageSkeltonComponent } from "../../shared/components/skeletons/products-page/products-page-skelton.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent, PaginationComponent, ProductsPageSkeltonComponent, TranslateModule],
  templateUrl: './shop.component.html',
  styles: [`
    :host { display: block; min-height: 100vh; }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductListComponent implements OnInit {
  private productsService = inject(ProductsService);

  
  // Data & reactive state
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  isLoading = signal(true);

  filteredProducts$ = new BehaviorSubject<Product[]>([]);
  paginatedProducts$ = this.filteredProducts$.pipe(map(products => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return products.slice(start, start + this.pageSize);
  }));

  // Pagination state
  currentPage = signal(1);
  totalPages = signal(0);
  pageSize = 8;

  // Filter state
  searchTerm = '';
  selectedCategories: string[] = [];

  productsEffect = effect(() => {
    const prods = this.productsService.getProductsSignal()();
    if (prods.length > 0) {
      this.products.set(prods);
      this.categories.set([...new Set(prods.map(p => p.category))]);
      this.isLoading.set(false);

      this.filterProducts();
    }
  }, { allowSignalWrites: true });

  ngOnInit() {

  }

  filterProducts() {
    const filtered = this.products().filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          p.desc.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCat = this.selectedCategories.length === 0 || this.selectedCategories.includes(p.category);
      return matchSearch && matchCat;
    });
    this.filteredProducts$.next(filtered);
    this.currentPage.set(1);
    this.updatePaginatedProducts();
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    index === -1 ? this.selectedCategories.push(category) : this.selectedCategories.splice(index, 1);
    this.filterProducts();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    this.paginatedProducts$ = this.filteredProducts$.pipe(map(products => {
      const start = (this.currentPage() - 1) * this.pageSize;
      return products.slice(start, start + this.pageSize);
    }));
    this.totalPages.set(this.filteredProducts$.value.length);
  }

  calculateDiscountPercentage(originalPrice: any, afterDiscount: any) {
    return Math.round(((originalPrice - afterDiscount) / originalPrice) * 100);
  }
}
