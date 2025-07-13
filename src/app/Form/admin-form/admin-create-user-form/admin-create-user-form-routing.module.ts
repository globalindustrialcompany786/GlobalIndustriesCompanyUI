import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateUserFormComponent } from './admin-create-user-form.component';

const routes: Routes = [{ path: '', component: AdminCreateUserFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCreateUserFormRoutingModule { }
