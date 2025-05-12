import { Component, inject, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../../../../shared/components/buttons/dashboard-btn.component';
import { DataTableComponent } from '../../../../../../shared/components/data-table/data-table.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ImportsModule } from '../../../../../../shared/components/data-table/imports';
import { OrdersService } from '../../../../../../core/services/orders/orders.service';
import { Column } from '../blogs/admin-blogs.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [DataTableComponent, TranslateModule, ImportsModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent implements OnInit {
  private orderService = inject(OrdersService)
  private translate = inject(TranslateService)

  // Column Definitions for Table
  columns: Column[] = [
    { field: 'totalOrderPrice', header: 'Total Price', type: 'price' },
    { field: 'cartItems', header: 'Cart Items', type: 'length' },
    { field: 'paymentMethodType', header: 'Payment Method', type: 'text' },
    { field: 'paidAndDeliveredAt', header: 'Deliverd', type: 'boolen' },
  ];
  
  ngOnInit(): void {
    this.orderService.getAllOrders();
  }

  get orders() {
    return this.orderService.allOrders()
  }
}
