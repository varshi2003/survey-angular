import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewSurveysComponent } from './admin-view-surveys.component';

describe('AdminViewSurveysComponent', () => {
  let component: AdminViewSurveysComponent;
  let fixture: ComponentFixture<AdminViewSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewSurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
