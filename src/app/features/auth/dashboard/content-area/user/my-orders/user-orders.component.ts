import { Component, inject, OnInit } from '@angular/core';
import { DataTableComponent } from "../../../../../../shared/components/data-table/data-table.component";
import { Column } from '../../admin/blogs/admin-blogs.component';
import { TranslateService } from '@ngx-translate/core';
import { OrdersService } from '../../../../../../core/services/orders/orders.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit{
  private translate = inject(TranslateService);
  private orderService = inject(OrdersService);


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
}