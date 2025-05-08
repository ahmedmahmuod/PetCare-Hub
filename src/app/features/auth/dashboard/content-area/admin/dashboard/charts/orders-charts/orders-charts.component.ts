import { ChartModule } from 'primeng/chart';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './order-charts.component.html',
  standalone: true,
  imports: [ChartModule],
})
export class ChartVerticalBarDemo  {
    @Input({required: true}) data: any;
    @Input({required: true}) options: any;
}
