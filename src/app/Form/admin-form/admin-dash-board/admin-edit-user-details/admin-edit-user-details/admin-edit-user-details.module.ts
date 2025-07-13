import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEditUserDetailsRoutingModule } from './admin-edit-user-details-routing.module';
import { AdminEditUserDetailsComponent } from './admin-edit-user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AdminEditUserDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminEditUserDetailsRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AdminEditUserDetailsModule { }
