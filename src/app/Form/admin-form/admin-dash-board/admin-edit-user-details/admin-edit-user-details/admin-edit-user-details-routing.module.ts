import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEditUserDetailsComponent } from './admin-edit-user-details.component';

const routes: Routes = [{ path: '', component: AdminEditUserDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminEditUserDetailsRoutingModule { }
