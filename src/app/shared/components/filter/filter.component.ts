import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pet-filter',
  standalone: true,
  imports: [ CommonModule, FormsModule, TranslateModule ],
  template: `
    <div class="filter-container">
      <div class="flex items-baseline gap-2">
        <i class="fa-solid fa-filter"></i>
        <h3 class="filter-title">{{'Pages.Adoption.Filter.Title' | translate}}</h3>
      </div>
      <div class="filter-options">
        <label class="filter-option" [class.active]="selectedType === 'all'">
          <input type="radio" name="petType" value="all" [(ngModel)]="selectedType" (change)="onFilterChange()">
          <span class="filter-label">{{'Pages.Adoption.Filter.Values.All' | translate}}</span>
        </label>
        
        <label class="filter-option" [class.active]="selectedType === 'dog'">
          <input type="radio" name="petType" value="dog" [(ngModel)]="selectedType" (change)="onFilterChange()">
          <span class="filter-label">{{'Pages.Adoption.Filter.Values.Dogs' | translate}}</span>
          <i class="fa-solid fa-dog"></i>        
        </label>
        
        <label class="filter-option" [class.active]="selectedType === 'cat'">
          <input type="radio" name="petType" value="cat" [(ngModel)]="selectedType" (change)="onFilterChange()">
          <span class="filter-label">{{'Pages.Adoption.Filter.Values.Cats' | translate}}</span>
          <i class="fa-solid fa-cat"></i>        
        </label>
      </div>
    </div>
  `,
  styles: [`
    .fa-solid {
      font-size: 1.2rem;
      color: var(--brand-color);
    }

    .filter-container {
      margin-bottom: 24px;
    }
    
    .filter-title {
      font-size: 1.1rem;
      color: var(--brand-color);
      margin-bottom: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filter-options {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .filter-option {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 8px;
      background: #f7f7f7;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .filter-option:hover {
      background: #f0f0f0;
    }
    
    .filter-option.active {
      background: var(--brand-color, #4f46e5);
      color: var(--brand-color);
      border-color: var(--brand-color, #4f46e5);
    }
    
    .filter-option.active .filter-label {
      color: white;
    }
    
    .filter-option input[type="radio"] {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .filter-label {
      font-size: 0.95rem;
      font-weight: 500;
      color: #555;
      transition: color 0.2s ease;
    }
    
    .filter-option.active .filter-label {
      color: white;
    }
    .filter-option.active .fa-solid {
      color: white;
    }
    
    .dog-icon, .cat-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .filter-container {
        padding: 16px;
      }
      
      .filter-options {
        gap: 8px;
      }
      
      .filter-option {
        padding: 8px 12px;
        flex: 1 1 calc(50% - 8px);
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .filter-title {
        font-size: 1rem;
      }
      
      .filter-label {
        font-size: 0.85rem;
      }
      
      .dog-icon, .cat-icon {
        width: 16px;
        height: 16px;
      }
    }
  `]
})
export class PetFilterComponent {
  selectedType: 'all' | 'dog' | 'cat' = 'all';
  
  @Output() filterChange = new EventEmitter<'all' | 'dog' | 'cat'>();
  
  onFilterChange() {
    this.filterChange.emit(this.selectedType);
  }
}