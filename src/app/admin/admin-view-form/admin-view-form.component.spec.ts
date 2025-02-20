import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewFormComponent } from './admin-view-form.component';

describe('AdminViewFormComponent', () => {
  let component: AdminViewFormComponent;
  let fixture: ComponentFixture<AdminViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
