import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentAreaComponent } from './content-area/content-area.component';
import { HeaderComponent } from './header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, ContentAreaComponent, HeaderComponent],
  template: `
    <div class="dashboard-root">
      <app-dashboard-sidebar [opened]="sidebarOpened" (closed)="sidebarOpened = false"></app-dashboard-sidebar>
      <div class="main-area" [class.sidebar-opened]="sidebarOpened">
        <app-dashboard-header (toggleSidebar)="toggleSidebar()"></app-dashboard-header>
        <app-dashboard-content></app-dashboard-content>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-root {
      min-height: 100vh;
      width: 100vw;
      margin-bottom: -40px;
    }
    .main-area {
      min-width: 0;
      height: 100vh;
      background: #f0f2f5;
      display: flex;
      flex-direction: column;
      transition: padding-inline-start 0.3s;
      padding-inline-start: 0;
    }
    @media (min-width: 768px) {
      .dashboard-root {
        display: block;
      }
      .main-area.sidebar-opened {
        padding-inline-start: 240px;
      }
      .main-area:not(.sidebar-opened) {
        padding-inline-start: 0;
      }
    }
    @media (max-width: 767px) {
      .dashboard-root {
        display: block;
      }
      .main-area {
        padding-inline-start: 0;
      }
    }
  `]
})
export class DashboardComponent {
  sidebarOpened = window.innerWidth > 767;

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }
} 