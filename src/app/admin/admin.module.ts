

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminViewSurveysComponent } from './admin-view-surveys/admin-view-surveys.component';
import { AdminCreateFormComponent } from './admin-create-form/admin-create-form.component';
import { SurveyResponseDashboardComponent } from './survey-response-dashboard/survey-response-dashboard.component';

@NgModule({
 
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminDashboardComponent,
    AdminViewSurveysComponent,
    SurveyResponseDashboardComponent,
    FormsModule
  ],

})
export class AdminModule { }
