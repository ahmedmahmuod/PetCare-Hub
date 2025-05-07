import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="content-area">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .content-area {
        flex: 1;
        padding: 24px;
        background: #f0f2f5;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class ContentAreaComponent {}
