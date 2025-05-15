import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-export-exel-btn',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="flex justify-center">
      <button class="primary-btn" (click)="onClick()">
        <i class="fa-solid fa-floppy-disk"></i>
        {{ label }}
      </button>
  </div>
  `,
  styles: [
    `
      .primary-btn {
        background-color: var(--brand-seconed-color);
        color: var(--seconed-color);
        border: none;
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .primary-btn:hover {
        opacity: 0.8;
      }
    `,
  ],
})
export class ExportToExelButtonComponent {
  private translate = inject(TranslateService);

  @Input() label: string = this.translate.instant('Export_As_Exel');
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
