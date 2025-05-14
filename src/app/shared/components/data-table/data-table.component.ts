import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Column } from '../../../features/auth/dashboard/content-area/admin/blogs/admin-blogs.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TranslateModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] | null = null;
  @Input() columns!: Column[];
  @Input() hasImage: boolean = false;
  @Input() hasActions: boolean = false;

  @Output() deleteItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() editItem: EventEmitter<any> = new EventEmitter<any>();


  onDeleteItem(col: any) {
    this.deleteItem.emit(col);
  }
  
  onEditItem(col: any) {
    this.editItem.emit(col);
  }

  currentPageReportTemplate: string = '';
  first = 0;
  rows = 5;
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get('Dashboard.TABLE.PAGE_REPORT').subscribe(res => {
      this.currentPageReportTemplate = res;
    });
  }

  next() {
    this.first += this.rows;
  }

  prev() {
    this.first -= this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.data ? this.first >= this.data.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }
}
