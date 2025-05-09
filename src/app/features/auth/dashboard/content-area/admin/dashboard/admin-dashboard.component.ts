import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../../core/services/orders/orders.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../../../core/services/products/products.service';
import { PetsService } from '../../../../../../core/services/pets/pets.services';
import { ChartVerticalBarDemo } from "./charts/orders-charts/orders-charts.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ChartVerticalBarDemo, TranslateModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  // Privates
  private ordersService = inject(OrdersService);
  private productsService = inject(ProductsService);
  private petsService = inject(PetsService);
  private translate = inject(TranslateService);

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
      labels: [
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jan'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.feb'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.mar'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.apr'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.may'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jun'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jul'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.aug')
      ],
      datasets: [
        {
          label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Orders_Chart.Title'),
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
    labels: [
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jan'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.feb'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.mar'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.apr'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.may'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jun'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.jul'),
        this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Months.aug')
    ],
    datasets: [
        {
            label: this.translate.instant('Dashboard.Admin.Sidebar_Links.Dashboard.Charts.Sales_Chart.Title'),
            backgroundColor: documentStyle.getPropertyValue('--pink-500'),
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            data: [65, 59, 10, 31, 56, 55, 40, 22]
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