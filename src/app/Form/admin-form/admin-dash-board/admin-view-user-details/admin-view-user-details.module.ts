import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminViewUserDetailsRoutingModule } from './admin-view-user-details-routing.module';
import { AdminViewUserDetailsComponent } from './admin-view-user-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AdminViewUserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminViewUserDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ], exports: [
    AdminViewUserDetailsComponent
  ]
})
export class AdminViewUserDetailsModule { }
