import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetsHomeComponent } from './vets-home.component';

describe('VetsHomeComponent', () => {
  let component: VetsHomeComponent;
  let fixture: ComponentFixture<VetsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
