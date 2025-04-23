import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPageSkeltonComponent } from './products-page-skelton.component';

describe('ProductsPageSkeltonComponent', () => {
  let component: ProductsPageSkeltonComponent;
  let fixture: ComponentFixture<ProductsPageSkeltonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPageSkeltonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPageSkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
