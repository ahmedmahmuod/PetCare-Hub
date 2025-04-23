import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, computed, signal, Signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ CommonModule , TranslateModule],
  template: `
    <div class="flex justify-center items-center mt-10 gap-2 flex-wrap">
      <button (click)="changePage(currentPage() - 1)" [disabled]="currentPage() === 1" class="w-24 py-2 border rounded border-brand-color text-brand-color hover:bg-brand-color hover:text-seconed-color disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-color">
        {{ 'Global.Pagination.Prev' | translate }}
      </button>

      <ng-container *ngIf="pages() as pagesList">
        <button *ngFor="let page of pagesList" (click)="changePage(page)" [ngClass]="{'bg-brand-color text-seconed-color font-bold': currentPage() === page,'bg-seconed-color text-gray-700': currentPage() !== page}" class="px-3 py-2 rounded border border-gray-300">
          {{ page }}
        </button>
      </ng-container>

      <button (click)="changePage(currentPage() + 1)" [disabled]="currentPage() === totalPages()" class="w-24 py-2 border rounded border-brand-color text-brand-color hover:bg-brand-color hover:text-seconed-color disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-brand-color">
        {{ 'Global.Pagination.Next' | translate }}
      </button>
    </div>
  `
})
export class PaginationComponent {
  @Input() totalItems!: Signal<number>;
  @Input() itemsPerPage: number = 10;
  @Input({ required: true }) currentPage = signal(1);
  
  @Output() pageChange = new EventEmitter<number>();

  totalPages = computed(() => Math.ceil(this.totalItems() / this.itemsPerPage));

  pages = computed(() => {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  });

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.currentPage.set(page);
      this.pageChange.emit(page);
    }
  }
}
