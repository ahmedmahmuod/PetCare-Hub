import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../../core/services/user/users.service';
import { UserData } from '../../../../core/models/user/details/user-details.model';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="dashboard-header">
      <div class="header-left">
        <button class="menu-btn" aria-label="menu" (click)="toggleSidebar.emit()"><span></span><span></span><span></span></button>
      </div>
      <div class="header-right">
        <ng-container *ngIf="(authData$ | async) as data">
          <div class="user-info">
            <div class="user-avatar">
              <img [src]="data.profileImage" [alt]="data.name" />
              <div class="status-indicator" [class.admin]="data.role === 'admin'"></div>
            </div>
            <div class="user-details">
              <span class="user-name">{{data.name}}</span>
              <span class="user-role">{{data.role === 'admin' ? 'Administrator' : 'User'}}</span>
            </div>
          </div>
        </ng-container>
      </div>
    </header>
  `,
  styles: [`
    .dashboard-header {
      height: 64px;
      background: var(--brand-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: 10;
      position: sticky;
      top: 0;
    }
    .header-left {
      display: flex;
      align-items: center;
    }
    .menu-btn {
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 32px;
      width: 32px;
      margin-right: 16px;
      cursor: pointer;
      padding: 0;
      transition: 0.2s;
      background: transparent;
    }
    .menu-btn span {
      display: block;
      width: 22px;
      height: 3px;
      background: var(--seconed-color);
      margin: 3px 0;
      border-radius: 2px;
      transition: 0.2s;
    }
    .header-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-info {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 4px 16px 4px 4px;
      margin-left: 8px;
      transition: all 0.3s ease;
    }
    .user-info:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    .user-avatar {
      position: relative;
      margin-right: 12px;
    }
    .user-avatar img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
      object-fit: cover;
    }
    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #4CAF50;
      border: 2px solid var(--brand-color);
    }
    .status-indicator.admin {
      background: #FFC107;
    }
    .user-details {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      line-height: 1.2;
    }
    .user-role {
      font-size: 12px;
      color: var(--brand-seconed-color);
      line-height: 1.2;
      font-wight: bold;
    }
  `]
})
export class HeaderComponent {
  // Privates 
  private userService = inject(UsersService);

  // @inputs & outputs
  @Output() toggleSidebar = new EventEmitter<void>();

  // Global Variables
  authData$ = this.userService.user$;
} 