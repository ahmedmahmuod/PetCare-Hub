import { Component, Input, Output, EventEmitter, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../../../../shared/services/token-managment/token-management.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
  template: `
    <ng-container *ngIf="isMobile && opened">
      <div class="sidebar-backdrop" (click)="closeSidebar()" tabindex="-1" aria-label="Close sidebar"></div>
    </ng-container>
    <aside class="sidebar" [class.opened]="opened" [class.not-opened]="!opened" [class.mobile-mode]="isMobile" [class.rtl]="isRtl" [attr.aria-expanded]="opened" role="navigation">
      <div class="sidebar-logo" *ngIf="isMobile">
        <button class="close-btn" *ngIf="isMobile && opened" (click)="closeSidebar()" aria-label="Close sidebar">✕</button>
      </div>

      <ng-container *ngIf="(role$ | async) as role">
         <!-- Admin Dashboards Link -->
         <nav *ngIf="role === 'admin'" class="sidebar-menu" aria-label="Main menu">
           <ul>
             <li [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="active" routerLink="/admin/dashboard/" tabindex="0"><i class="fa-solid fa-gauge"></i>{{'Dashboard.Admin.Sidebar_Links.Dashboard.Title' | translate}}</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/blogs" tabindex="0"><i class="fa-solid fa-pen-to-square"></i>{{'Dashboard.Admin.Sidebar_Links.Blogs.Title' | translate}}</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/services" tabindex="0"><i class="fa-solid fa-paw"></i>{{'Dashboard.Admin.Sidebar_Links.Services.Title' | translate}}</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/coupons" tabindex="0"><i class="fa-solid fa-tag"></i>Coupons</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/products" tabindex="0"><i class="fa-solid fa-basket-shopping"></i>Products</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/doctors" tabindex="0"><i class="fa-solid fa-user-doctor"></i>Doctors</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/clinics" tabindex="0"><i class="fa-solid fa-briefcase-medical"></i>Clinics</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/orders" tabindex="0"><i class="fa-regular fa-money-bill-1"></i>Orders</li>
             <li routerLinkActive="active" routerLink="/admin/dashboard/users" tabindex="0"><i class="fa-solid fa-users"></i>Users</li>
           </ul>
           <li (click)="goToHome()"><i class="fa-solid fa-arrow-up-right-from-square"></i>{{'Dashboard.Main.Links.View_Site' | translate}}</li>
         </nav>

         <!-- User Dashboards Link -->
         <nav *ngIf="role === 'user'" class="sidebar-menu" aria-label="Main menu">
           <ul>
             <li routerLinkActive="active" routerLink="/user/dashboard/reviews" tabindex="0"><i class="fa-solid fa-gauge"></i>My Reviews</li>
             <li routerLinkActive="active" routerLink="/user/dashboard/pets" tabindex="0"><i class="fa-solid fa-dog"></i>My Pets</li>
             <li routerLinkActive="active" routerLink="/user/dashboard/orders" tabindex="0"><i class="fa-regular fa-money-bill-1"></i>My Orders</li>
           </ul>
           <li (click)="goToHome()"><i class="fa-solid fa-arrow-up-right-from-square"></i>{{'Dashboard.Main.Links.View_Site' | translate}}</li>
         </nav>
       </ng-container>

    </aside>
  `,
  styles: [`
    .sidebar {
      height: 100vh;
      background: var(--brand-color);
      display: flex;
      flex-direction: column;
      position: fixed;
      inset-inline-start: 0;
      top: 0;
      z-index: 1200;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      width: 240px;
      min-width: 200px;
      max-width: 90vw;
      transition: inset-inline-start 0.3s, box-shadow 0.3s, background 0.3s;
      overflow: hidden;
    }
    .sidebar.not-opened {
      inset-inline-start: -260px;
      box-shadow: none;
    }
    .sidebar-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.25);
      z-index: 1199;
      animation: fadeIn 0.2s;
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 20px 0 14px;
      font-size: 20px;
      font-weight: bold;
      position: relative;
      gap: 12px;
      user-select: none;
      letter-spacing: 0.5px;
    }
    .close-btn {
      display: none;
      position: absolute;
      inset-inline-end: 8px;
      top: 18px;
      background: none;
      border: none;
      color: var(--brand-seconed-color);
      font-size: 26px;
      cursor: pointer;
      z-index: 10;
      border-radius: 50%;
      transition: 0.2s;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
    .close-btn:hover {
      background: #22304a;
    }
    .sidebar-menu {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #22304a #001529;
    }
    .sidebar-menu ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }
    .sidebar-menu li {
      display: flex;
      align-items: center;
      padding: 19px 26px;
      cursor: pointer;
      color: var(--seconed-color);
      font-size: 17px;
      transition: 0.18s;
      outline: none;
      gap: 14px;
      position: relative;
      font-weight: 500;
      letter-spacing: 0.2px;
    }
    .sidebar.rtl .sidebar-menu li {
      border-radius: 0 8px 8px 0;
    }
    .sidebar-menu li.active, .sidebar-menu li:focus, .sidebar-menu li:hover {
      background: var(--brand-seconed-color);
      color: var(--brand-color);
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.08);
    }

    .sidebar-menu .icon {
      font-size: 22px;
      min-width: 28px;
      text-align: center;
    }
    .sidebar.mobile-mode .close-btn {
      display: block;
    }
    @media (max-width: 767px) {
      .sidebar {
        inset-inline-start: -260px;
        width: 220px;
        min-width: 180px;
        max-width: 90vw;
        border-radius: 0 18px 18px 0;
        transition: inset-inline-start 0.3s, box-shadow 0.3s;
      }
      .sidebar.opened.mobile-mode {
        inset-inline-start: 0;
        box-shadow: 0 8px 32px rgba(0,0,0,0.22);
      }
      .close-btn {
        display: block;
      }
    }
    @media (min-width: 768px) {
      .sidebar {
        position: fixed;
        inset-inline-start: 0;
        top: 0;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        width: 240px;
        min-width: 200px;
        max-width: 240px;
      }
      .sidebar.rtl {
        border-radius: 18px 0 0 18px;
      }
      .sidebar.opened,
      .sidebar {
        inset-inline-start: 0;
      }
      .sidebar.not-opened {
        inset-inline-start: -260px;
        box-shadow: none;
      }
      .sidebar-backdrop,
      .close-btn {
        display: none !important;
      }
    }
  `]
})
export class SidebarComponent {
  // Privates 
  private router = inject(Router)
  private tokenService = inject(TokenService)

  // @Inputs & Outputs
  @Input() opened = true;
  @Output() closed = new EventEmitter<void>();

  // Global Variables
  role$ = this.tokenService.role$;

  get isMobile() {
    return window.innerWidth <= 767;
  }

  get isRtl() {
    return document?.documentElement?.dir === 'rtl';
  }

  closeSidebar() {
    this.closed.emit();
  }

  // on Go to home func
  goToHome() {
    this.router.navigate(['/'])
  }
} 