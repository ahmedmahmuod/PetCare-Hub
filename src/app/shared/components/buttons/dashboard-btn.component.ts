import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImportsModule } from '../data-table/imports';

@Component({
  selector: 'app-dashboard-button',
  imports: [ImportsModule],
  standalone: true,
  template: `
    <p-button [label]="label" [icon]="icon" [type]="type" (onClick)="onClick()" [class]="'custom-add-button ' + styleClass"></p-button>
  `,
  styles: [`
    ::ng-deep .custom-add-button .p-button {
      background: var(--brand-color);
      color: var(--seconed-color);
      padding: 10px 25px;
      transition: opacity  0.3s;
      border: none;
      outline: none;
      box-shadow: none;
    }

    ::ng-deep .custom-add-button .p-button:hover {
      opacity: 0.8;
    }

    ::ng-deep .custom-add-button .p-button:focus,
    ::ng-deep .custom-add-button .p-button:active {
      border: none;
      outline: none;
      box-shadow: none;
    }

    ::ng-deep .custom-add-button {
        display: flex;
        justify-content: center;
    }

  `]
})
export class CustomButtonComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() styleClass: string = '';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
