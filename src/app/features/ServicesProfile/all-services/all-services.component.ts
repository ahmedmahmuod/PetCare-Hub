import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { ServiceModel } from '../../../core/models/service/service.model';
import { ServicesService } from '../../../core/services/services/services.service';
import { HeroSectionComponent } from "../../../shared/components/hero-section/hero-section.component";
import { SkeletonCardComponent } from "../../../shared/components/skeletons/card-services/skelton-services-card.component";
import { ServicesCardComponent } from "../../../shared/components/services-cards/servicesCard.component";
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-services',
  standalone: true,
  imports: [
    HeroSectionComponent,
    SkeletonCardComponent,
    ServicesCardComponent,
    TranslateModule,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css',
})
export class AllServicesComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private serviceServices = inject(ServicesService);

  // State
  services = signal<ServiceModel[]>([]);
  selectedService = signal('');
  location = signal('');
  formServiceType = '';
  formCity = '';
  isLoading = signal(true);
  hasNoResults = signal(false);

  // Pagination
  currentPage = signal(1);
  pageSize = 12;
  totalItems = signal(0);

  allServicesType: string[] = [];
  locations: string[] = [];

  // Filtered services
  filteredServices = computed(() => {
    const all = this.services();
    const type = this.selectedService().toLowerCase().trim();
    const city = this.location().toLowerCase().trim();

    return all.filter(service => {
      const matchType = type ? service.serviceType.toLowerCase().includes(type) : true;
      const matchCity = city ? service.city.toLowerCase().includes(city) : true;
      return matchType && matchCity;
    });
  });

  // Paginated services
  paginatedServices = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredServices().slice(start, end);
  });

  // Effect: تحميل البيانات من السيجنال لما تتغير
  private servicesEffect = effect(() => {
    const all = this.serviceServices.allServices();
    if (this.isLoading() && all.length > 0) {
      const filtered = all.filter(s => s.serviceImage);
      this.services.set(filtered);
      this.extractFilterOptions(filtered);
      this.isLoading.set(false);

      // تطبيق الفلاتر بعد التحميل
      if (this.selectedService() || this.location()) {
        this.applyFilters(false);
      }
    }
  }, { allowSignalWrites: true });

  // Effect: تحديث العدد والتحقق من عدم وجود نتائج
  private filtersMetaEffect = effect(() => {
    const filtered = this.filteredServices();
    this.totalItems.set(filtered.length);
    this.hasNoResults.set(filtered.length === 0);
  }, { allowSignalWrites: true });

  // Effect: إعادة ضبط الصفحة لو الفلترة قللت عدد النتائج
  private pageResetEffect = effect(() => {
    const filtered = this.filteredServices();
    const maxPage = Math.ceil(filtered.length / this.pageSize);

    if (this.currentPage() > maxPage && maxPage > 0) {
      this.currentPage.set(maxPage);
    } else if (filtered.length === 0) {
      this.currentPage.set(1);
    }
  }, { allowSignalWrites: true });

  ngOnInit(): void {
    this.checkRouteParams();
    this.loadServices();
  }

  private loadServices(): void {
    this.isLoading.set(true);
    this.serviceServices.getAllServices();
  }

  private checkRouteParams(): void {
    this.route.queryParams
      .pipe(
        take(1),
        tap(params => {
          this.selectedService.set(params['serviceType'] || '');
          this.location.set(params['city'] || '');
          this.formServiceType = this.selectedService();
          this.formCity = this.location();
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private extractFilterOptions(services: ServiceModel[]): void {
    this.allServicesType = Array.from(new Set(services.map(s => s.serviceType)));
    this.locations = Array.from(new Set(services.map(s => s.city)));
  }

  applyFilters(updateUrl = true): void {
    this.currentPage.set(1);
    if (updateUrl) this.updateUrlWithFilters();
  }

  resetFilters(): void {
    this.selectedService.set('');
    this.location.set('');
    this.formServiceType = '';
    this.formCity = '';
    this.currentPage.set(1);
    this.hasNoResults.set(false);
    this.updateUrlWithFilters();
  }

  onSearch(event: any): void {
    this.selectedService.set(event.service);
    this.location.set(event.location);
    this.currentPage.set(1);
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  private updateUrlWithFilters(): void {
    const queryParams: any = {};
    if (this.selectedService()) queryParams.serviceType = this.selectedService();
    if (this.location()) queryParams.city = this.location();

    const currentScroll = window.scrollY;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: '',
      replaceUrl: true,
      skipLocationChange: false
    }).then(() => {
      setTimeout(() => {
        window.scrollTo({ top: currentScroll, behavior: 'auto' });
      }, 0);
    });
  }
}
