import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashBoardRoutingModule } from './user-dash-board-routing.module';
import { UserDashBoardComponent } from './user-dash-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    UserDashBoardComponent
  ],
  imports: [
    CommonModule,
    UserDashBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class UserDashBoardModule { }
