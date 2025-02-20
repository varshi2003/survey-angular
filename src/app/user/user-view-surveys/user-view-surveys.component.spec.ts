import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewSurveysComponent } from './user-view-surveys.component';

describe('UserViewSurveysComponent', () => {
  let component: UserViewSurveysComponent;
  let fixture: ComponentFixture<UserViewSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserViewSurveysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
