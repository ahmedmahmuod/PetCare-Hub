import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container" [class.exiting]="isExiting" [class.hide]="isHiding">
      <div class="loading-content">
        <div class="logo">
          <div class="paw-print">
            <div class="pad"></div>
            <div class="toe toe-1"></div>
            <div class="toe toe-2"></div>
            <div class="toe toe-3"></div>
            <div class="toe toe-4"></div>
          </div>
        </div>
        <div class="loading-indicator">
          <div class="progress-bar">
            <div class="progress-fill" [style.width]="progress + '%'" [style.opacity]="!isExiting ? 1 : 0"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--brand-color);
      z-index: 1000;
      transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .loading-container.exiting {
      opacity: 0;
      transform: scale(1.05);
      pointer-events: none;
    }

    .loading-container.hide {
      display: none;
    }

    .loading-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.6s ease, opacity 0.6s ease;
    }

    .logo {
      margin-bottom: 2rem;
      animation: float 3s ease-in-out infinite;
    }

    .paw-print {
      width: 80px;
      height: 80px;
      position: relative;
      animation: pulse 2s infinite;
    }

    .pad {
      width: 40px;
      height: 40px;
      background-color: var(--brand-seconed-color);
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .toe {
      width: 20px;
      height: 20px;
      background-color: var(--brand-seconed-color);
      border-radius: 50%;
      position: absolute;
    }

    .toe-1 { top: 0; left: 50%; transform: translateX(-50%); }
    .toe-2 { top: 20px; left: 0; }
    .toe-3 { top: 20px; right: 0; }
    .toe-4 { top: 40px; left: 50%; transform: translateX(-50%); }

    .loading-indicator {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .progress-bar {
      width: 200px;
      height: 8px;
      border: 1px solid var(--fourth-color);
      border-radius: 10px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--brand-seconed-color);
      border-radius: 10px;
      transition: width 0.3s ease, opacity 0.3s ease;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }

    @media (max-width: 768px) {
      .paw-print { width: 60px; height: 60px; }
      .pad { width: 30px; height: 30px; }
      .toe { width: 15px; height: 15px; }
    }
  `]
})
export class LoadingComponent implements OnInit {
  @Input() progress = 0;
  @Input() set hide(value: boolean) {
    if (value) {
      this.startExitAnimation();
    }
  }

  isHiding = false;
  isExiting = false;

  ngOnInit() {
    if (this.progress === 0) {
      this.simulateProgress();
    }
  }

  simulateProgress() {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      this.progress = currentProgress;
      if (currentProgress >= 100) {
        clearInterval(interval);
        this.startExitAnimation();
      }
    }, 30);
  }

  startExitAnimation() {
    if (!this.isExiting) {
      this.isExiting = true;
  
      setTimeout(() => {
        this.isHiding = true;
      }, 600); 
    }
  }
  
}
