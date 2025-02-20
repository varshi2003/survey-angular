import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResponseDashboardComponent } from './survey-response-dashboard.component';

describe('SurveyResponseDashboardComponent', () => {
  let component: SurveyResponseDashboardComponent;
  let fixture: ComponentFixture<SurveyResponseDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyResponseDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyResponseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
