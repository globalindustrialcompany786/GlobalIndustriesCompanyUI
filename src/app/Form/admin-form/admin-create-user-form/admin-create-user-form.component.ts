import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AdminLoginService } from "src/app/api/adminLogin.service";

@Component({
  selector: "app-admin-create-user-form",
  templateUrl: "./admin-create-user-form.component.html",
  styleUrls: ["./admin-create-user-form.component.css"],
})
export class AdminCreateUserFormComponent {
  userCreate: FormGroup;
  profileImg: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: AdminLoginService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.userCreate = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: [""],
      email: ["", [Validators.required, Validators.email]],
      employeeId: ["", Validators.required],
      password: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      profile: [""],
      department: [""],
      dateOfHire: ["", Validators.required],
      employeeStatus: ["", Validators.required],
      employeeType: ["", Validators.required],
      title: [""],
      sourceOfHire: ["", Validators.required],
      workPhone: [""],
      salary: [""],
      payType: ["", Validators.required],
      passportNumber: [""],
      maritalStatus: ["", Validators.required],
      gender: ["", Validators.required],
      address1: [""],
      address2: [""],
      city: [""],
      state: [""],
      country: [""],
      phone: [""],
      otherEmail: ["", [Validators.email]],
    });
  }

  // Safe getter method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.userCreate.get(controlName);
    return (control?.invalid && control?.touched) || false;
  }

  onFileSelected(event: any) {
    this.profileImg = event.target.files[0];
  }

  onSubmit() {
    this.spinner.show();

    // Mark all form controls as touched
    this.markFormGroupTouched(this.userCreate);

    if (this.userCreate.valid) {
      const formData = new FormData();
      const formValues = this.userCreate.value;

      // Append form values to FormData
      Object.keys(formValues).forEach((key) => {
        if (key != 'profile') {
          formData.append(key, formValues[key]);
        }
      });

      // Append image data to FormData
      formData.append('profile', this.profileImg);
      const adminToken = localStorage.getItem("adminToken");

      this.http.registerUser(adminToken, formData).subscribe({
        next: (res) => {
          this.spinner.hide();
          if (res.success) {
            this.toastr.success(res.message);
            this.router.navigateByUrl("/adminDashBoard");
          }
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error(error.error.message);
        }
      });
    } else {
      this.spinner.hide();
      this.toastr.warning("Please fill in all required fields");
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
