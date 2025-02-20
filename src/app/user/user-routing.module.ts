
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewSurveysComponent } from './user-view-surveys/user-view-surveys.component';
import { SurveyFormPageComponent } from './survey-form-page/survey-form-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'view-surveys', pathMatch: 'full' },
  { path: 'view-surveys', component: UserViewSurveysComponent },
  { path: 'survey-form-page/:surveyId', component: SurveyFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

