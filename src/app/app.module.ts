
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
    FormsModule,
    BrowserModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

