import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserLoginService } from '../api/userLogin.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardGuard{
  constructor(private loginService: UserLoginService,
    private router: Router,
    private toastr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isUserLoggedIn()) {
      return true; // User is logged in, allow access
    } else {
      this.toastr.warning("You need to be logged in to access this page.");
      this.router.navigateByUrl("/userForm");
      return false;
    }
  }
}
