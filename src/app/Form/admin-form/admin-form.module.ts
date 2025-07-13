import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminFormRoutingModule } from './admin-form-routing.module';
import { AdminFormComponent } from './admin-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    AdminFormRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AdminFormModule { }
