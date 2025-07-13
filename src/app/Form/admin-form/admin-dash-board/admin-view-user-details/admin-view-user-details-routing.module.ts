import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewUserDetailsComponent } from './admin-view-user-details.component';

const routes: Routes = [{ path: '', component: AdminViewUserDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminViewUserDetailsRoutingModule { }
