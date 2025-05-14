import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Order, OrderResponse } from '../../models/orders/orders.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);

  // Signals
  private ordersSignal = signal<Order[]>([]);
  
  public totalOrders = computed(() => this.ordersSignal().length);
  public totalRevenue = computed(() =>
    this.ordersSignal()
  .filter(o => o.isPaidAndDelivered)
  .reduce((acc, curr) => acc + curr.totalOrderPrice, 0)
);

  public readonly allOrders = computed(() => this.ordersSignal());

  constructor() {
    this.loadOrders();
  }

  // Get All Orders
  getAllOrders(): void {
    this.http.get<OrderResponse>(environment.apiUrl + 'order/getallorder')
      .pipe(map((res) => res.data))
      .subscribe({
        next: (orders) => this.ordersSignal.set(orders),
        error: (err) => console.error('Failed to load orders', err)
      });
  }

  // fetch orders once and cache in signal
  private loadOrders() {
    this.http.get<OrderResponse>(environment.apiUrl + 'order/getallorder').subscribe({
      next: (res) => this.ordersSignal.set(res.data),
      error: (err) => console.error('Failed to load orders', err),
    });
  }

  // Get signal to subscribe to it in components
  getOrdersSignal() {
    return this.ordersSignal.asReadonly();
  }

  // Get My Orders
  getMyOrders() {
    this.http.get<OrderResponse>(environment.apiUrl + 'order/getallownorder')
      .pipe(map((res) => res.data))
      .subscribe({
        next: (orders) => this.ordersSignal.set(orders),
      });
  }
}
