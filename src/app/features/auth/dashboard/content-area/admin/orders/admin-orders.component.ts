import { ExcelExportService } from './../../../../../../shared/services/export_to_exel/export-to-exel.service';
import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { OrdersService } from '../../../../../../core/services/orders/orders.service';
import { Column } from '../blogs/admin-blogs.component';
import { ExportToExelButtonComponent } from "../../../../../../shared/components/buttons/export-to-exel.component";
@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [DataTableComponent, TranslateModule, ImportsModule, ExportToExelButtonComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrdersService)
  private translate = inject(TranslateService)
  private exportExelService = inject(ExcelExportService)

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'totalOrderPrice', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Orders.Data_Table.Rows.Order_Price'), type: 'price' },
    { field: 'cartItems', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Orders.Data_Table.Rows.Order_Item'), type: 'length' },
    { field: 'paymentMethodType', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Orders.Data_Table.Rows.Payment_Methode'), type: 'text' },
    { field: 'paidAndDeliveredAt', header: this.translate.instant('Dashboard.Admin.Sidebar_Links.Orders.Data_Table.Rows.Deliverd'), type: 'boolen' },
  ];
  
  ngOnInit(): void {
    this.orderService.getAllOrders();
  }

  get orders() {
    return this.orderService.allOrders()
  }

  exportOrders(): void {
    this.exportExelService.exportAsExcelFile(this.orders, 'orders');
  }
}
