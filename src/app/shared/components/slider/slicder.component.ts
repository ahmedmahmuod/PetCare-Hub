import { Component, OnInit, HostListener, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="slider-container container" dir="ltr">
      <div class="slider">
        <div class="slides" [style.transform]="'translateX(' + (-currentIndex * 100) + '%)'">
          <div class="slide-group" *ngFor="let group of itemGroups">
            <div class="grid">
              <div class="grid-item" *ngFor="let item of group">
                <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }">
                </ng-container>
              </div>
            </div>
          </div>
        </div>
        
        <div class="nav-buttons">
          <button class="nav-button prev" (click)="prevSlide()" [class.hidden]="currentIndex === 0" [disabled]="currentIndex === 0">
            <span>❮</span>
          </button>
          <button class="nav-button next" (click)="nextSlide()" [class.hidden]="currentIndex >= itemGroups.length - 1" [disabled]="currentIndex >= itemGroups.length - 1">
            <span>❯</span>
          </button>
        </div>
      </div>
      <ng-content select="[slider-footer]"></ng-content>
    </div>
  `,
  styles: [`
    .slider-container {
      margin: 0 auto;
      border-radius: 8px;
      text-align: center;
      position: relative;
      margin-top: 40px;
    }

    .slider {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
    }

    .slides {
      display: flex;
      transition: transform 0.5s ease-in-out;
      height: 100%;
      width: 100%;
    }

    .slide-group {
      min-width: 100%;
      height: 100%;
      padding: 0 10px;
      flex-shrink: 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      height: 100%;
    }

    .grid-item {
      height: 100%;
      min-width: 0;
    }

    .nav-buttons {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      pointer-events: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      z-index: 10;
    }

    .nav-button {
      pointer-events: auto;
      background: rgba(0, 0, 0, 0.5);
      border: 2px solid white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      transition: all 0.3s ease;
      opacity: 1;
    }

    .nav-button:hover:not(:disabled) {
      background: rgba(0, 0, 0, 0.7);
      transform: scale(1.1);
    }

    .nav-button:disabled {
      opacity: 0;
      cursor: default;
    }

    .hidden {
      opacity: 0;
      pointer-events: none;
    }

    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr;
        gap: 15px;
      }

      .nav-button {
        width: 35px;
        height: 35px;
        font-size: 1.2rem;
      }
    }
  `]
})
export class SliderComponent implements OnInit { 
  @Input() items: any[] = [];
  @Input() itemsPerSlide = 3;
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<any>;

  itemGroups: Array<any[]> = [];
  currentIndex = 0;

  @HostListener('window:resize')
  onResize() {
    const previousItemsPerSlide = this.itemsPerSlide;
    this.updateItemsPerSlide();
    
    if (previousItemsPerSlide !== this.itemsPerSlide) {
      const currentFirstItemIndex = this.currentIndex * previousItemsPerSlide;
      this.groupItems();
      this.currentIndex = Math.floor(currentFirstItemIndex / this.itemsPerSlide);
    }
  }

  ngOnInit() {
    this.updateItemsPerSlide();
    this.groupItems();
  }

  updateItemsPerSlide() {
    if (window.innerWidth <= 768) {
      this.itemsPerSlide = 1;
    } else if (window.innerWidth <= 1024) {
      this.itemsPerSlide = 2;
    } else {
      this.itemsPerSlide = 3;
    }
  }

  groupItems() {
    this.itemGroups = [];
    for (let i = 0; i < this.items.length; i += this.itemsPerSlide) {
      this.itemGroups.push(this.items.slice(i, i + this.itemsPerSlide));
    }
  }

  nextSlide() {
    if (this.currentIndex < this.itemGroups.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

}