
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserViewSurveysComponent } from './user-view-surveys/user-view-surveys.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserViewSurveysComponent
  ]
})
export class UserModule { }
