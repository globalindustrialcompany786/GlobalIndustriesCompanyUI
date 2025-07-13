import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserLoginService } from 'src/app/api/userLogin.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  loginForm!: FormGroup;
  userData: Array<any> = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: UserLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  // Safe getter method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control?.touched || false;
  }

  submitForm() {
    this.spinner.show();
    this.http.userLogin(this.loginForm.value).subscribe({
      next: (loginResonse) => {
        this.spinner.hide();
        if (loginResonse.success) {
          localStorage.setItem("usertoken", loginResonse.token);
          this.toastr.success(loginResonse.message);
          this.router.navigateByUrl("/userDashBoard");
          this.userData = loginResonse.data;
          this.http.setUserData(this.userData);
        }
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);
      }
    })
  }
}
