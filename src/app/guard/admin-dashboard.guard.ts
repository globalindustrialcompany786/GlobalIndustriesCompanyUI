import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { AdminLoginService } from "../api/adminLogin.service";

@Injectable({
  providedIn: "root",
})
export class AdminDashboardGuard {
  constructor(
    private loginService: AdminLoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isAdminLoggedIn()) {
      return true; // User is logged in, allow access
    } else {
      this.toastr.warning("You need to be logged in to access this page.");
      this.router.navigateByUrl("/adminForm");
      return false;
    }
  }
}
