
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminCreateFormComponent } from './admin/admin-create-form/admin-create-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminCreateFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }

