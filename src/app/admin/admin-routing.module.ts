

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminViewSurveysComponent } from './admin-view-surveys/admin-view-surveys.component';
import { AdminCreateFormComponent } from './admin-create-form/admin-create-form.component';
import { SurveyResponseDashboardComponent } from './survey-response-dashboard/survey-response-dashboard.component';
import { AdminViewFormComponent } from './admin-view-form/admin-view-form.component';
import { ResponseDetailsComponent } from './response-details/response-details.component';
import { ResponsesComponent } from './responses/responses.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'view-surveys', component: AdminViewSurveysComponent },
  { path: 'create-form', component: AdminCreateFormComponent },
  { path: 'survey-response', component: SurveyResponseDashboardComponent },
  { path: 'admin-view-form/:id', component: AdminViewFormComponent },
  { path: 'survey-response-details/:id', component: ResponseDetailsComponent },
  { path: 'responses', component: ResponsesComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
