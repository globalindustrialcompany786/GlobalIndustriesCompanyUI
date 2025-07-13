import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AdminLoginService } from "src/app/api/adminLogin.service";

@Component({
  selector: "app-admin-form",
  templateUrl: "./admin-form.component.html",
  styleUrls: ["./admin-form.component.css"],
})
export class AdminFormComponent implements OnInit {
  loginForm!: FormGroup;
  userData: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  // Safe getter method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid && control?.touched) || false;
  }

  submitForm() {
    this.spinner.show();
    this.http.adminLogin(this.loginForm.value).subscribe(
      (loginResonse) => {
        this.spinner.hide();
        if (loginResonse.success) {
          localStorage.setItem("adminToken", loginResonse.token)
          this.toastr.success(loginResonse.message);
          this.userData = loginResonse.data;
          // Store the data in localStorage
          localStorage.setItem("adminData", JSON.stringify(this.userData));
          this.router.navigateByUrl("/adminDashBoard");
        }
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
}
