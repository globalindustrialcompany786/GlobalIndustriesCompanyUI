import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCreateUserFormRoutingModule } from './admin-create-user-form-routing.module';
import { AdminCreateUserFormComponent } from './admin-create-user-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AdminCreateUserFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AdminCreateUserFormRoutingModule,
    NgxSpinnerModule
  ]
})
export class AdminCreateUserFormModule { }
