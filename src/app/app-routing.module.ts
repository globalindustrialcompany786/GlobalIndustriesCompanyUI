import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from "./User/about-us/about-us.component";
import { IndexPageComponent } from "./User/index-page/index-page.component";
import { ContactUsComponent } from "./User/contact-us/contact-us.component";
import { OurMissionComponent } from "./User/our-mission/our-mission.component";
import { CarrerComponent } from "./User/carrer/carrer.component";
import { ConstructionComponent } from "./Services/construction/construction.component";
import { DriverComponent } from "./Services/driver/driver.component";
import { FactoryWorkersComponent } from "./Services/factory-workers/factory-workers.component";
import { RefiningChemicalComponent } from "./Services/refining-chemical/refining-chemical.component";
import { RestaurantHotelComponent } from "./Services/restaurant-hotel/restaurant-hotel.component";
import { FoodPackagingComponent } from "./Services/food-packaging/food-packaging.component";
import { UserDashboardGuard } from "./guard/user-dashboard.guard";
import { AdminDashboardGuard } from "./guard/admin-dashboard.guard";

const routes: Routes = [
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "index", component: IndexPageComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "our-mission", component: OurMissionComponent },
  { path: "career", component: CarrerComponent },
  { path: "construction", component: ConstructionComponent },
  { path: "driver", component: DriverComponent },
  { path: "factory-workers", component: FactoryWorkersComponent },
  { path: "refining-chemical", component: RefiningChemicalComponent },
  { path: "restaurant-hotel", component: RestaurantHotelComponent },
  { path: "food-packaging", component: FoodPackagingComponent },
  {
    path: "userForm",
    loadChildren: () =>
      import("./Form/user-form/user-form.module").then((m) => m.UserFormModule),
  },
  {
    path: "adminForm",
    loadChildren: () =>
      import("./Form/admin-form/admin-form.module").then(
        (m) => m.AdminFormModule
      ),
  },
  {
    path: "userDashBoard",
    loadChildren: () =>
      import(
        "../app/Form/user-form/user-dash-board/user-dash-board.module"
      ).then((m) => m.UserDashBoardModule),
    canActivate: [UserDashboardGuard],
  },
  {
    path: "adminDashBoard",
    loadChildren: () =>
      import(
        "../app/Form/admin-form/admin-dash-board/admin-dash-board.module"
      ).then((m) => m.AdminDashBoardModule),
    canActivate: [AdminDashboardGuard],
  },
  {
    path: "adminCreateUserForm",
    loadChildren: () =>
      import(
        "../app/Form/admin-form/admin-create-user-form/admin-create-user-form.module"
      ).then((m) => m.AdminCreateUserFormModule),
    canActivate: [AdminDashboardGuard],
  },
  { path: 'adminViewUserDetails', loadChildren: () => import('./Form/admin-form/admin-dash-board/admin-view-user-details/admin-view-user-details.module').then(m => m.AdminViewUserDetailsModule) },
  { path: 'adminEditUserDetails', loadChildren: () => import('./Form/admin-form/admin-dash-board/admin-edit-user-details/admin-edit-user-details/admin-edit-user-details.module').then(m => m.AdminEditUserDetailsModule) },
  { path: "**",redirectTo:"index"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
