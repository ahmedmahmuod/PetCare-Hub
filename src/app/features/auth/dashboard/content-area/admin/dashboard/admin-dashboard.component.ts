import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../../core/services/orders/orders.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../../../core/services/products/products.service';
import { PetsService } from '../../../../../../core/services/pets/pets.services';
import { ChartVerticalBarDemo } from "./charts/orders-charts/orders-charts.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ChartVerticalBarDemo],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  // Privates
  private ordersService = inject(OrdersService);
  private productsService = inject(ProductsService);
  private petsService = inject(PetsService);

  // Global Variables
  totalOrders = this.ordersService.totalOrders;
  totalRevenue = this.ordersService.totalRevenue;
  totalProducts = this.productsService.totalProducts
  totalPets = this.petsService.totalPets;


  dataOrder: any;
  optionsOrder: any;
  
  data: any;
  options: any;

  ngOnInit() {
    this.petsService.loadAllPets();
    // Order Chart
    const documentStyle = getComputedStyle(document.documentElement);
    this.dataOrder = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'],
      datasets: [
        {
          label: 'Orders',
          backgroundColor: documentStyle.getPropertyValue('--brand-seconed-color'),
          borderColor: documentStyle.getPropertyValue('--brand-color'),
          data: [65, 59, 80, 81, 56, 55, 40,2],
        },

      ],
    };

    this.optionsOrder = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
    };


    // Data chart
  this.data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Total Sales',
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [65, 59, 80, 81, 56, 55, 40]
        },
    ]
  };

  this.options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: documentStyle.getPropertyValue('--fourth-color')
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: documentStyle.getPropertyValue('--brand-color'),
                font: {
                    weight: 500
                }
            },
            grid: {
                color: documentStyle.getPropertyValue('--brand-color'),
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: documentStyle.getPropertyValue('--brand-color')
            },
            grid: {
                color: documentStyle.getPropertyValue('--brand-color'),
                drawBorder: false
            }
        }
    }
  }}
}