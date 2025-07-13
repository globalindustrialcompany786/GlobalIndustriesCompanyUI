import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminLoginService } from 'src/app/api/adminLogin.service';

@Component({
  selector: 'app-admin-edit-user-details',
  templateUrl: './admin-edit-user-details.component.html',
  styleUrls: ['./admin-edit-user-details.component.css']
})
export class AdminEditUserDetailsComponent {
  userEditForm: FormGroup;
  profileImage:any;

  constructor(
    private formBuilder: FormBuilder,
    private httpAdmin: AdminLoginService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.userEditForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: [""],
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
      maritalStatus: [""],
      gender: ["", Validators.required],
      address1: [""],
      address2: [""],
      city: [""],
      state: [""],
      country: [""],
      mobile: [""],
      otherEmail: ["", [Validators.email]],
    });

    this.bindFormValue();
  }

  bindFormValue() {
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const viewSingleUserDetail = [JSON.parse(viewUserData)];
    if (viewSingleUserDetail) {
      this.userEditForm.patchValue({
        firstName: viewSingleUserDetail[0].firstName,
        lastName: viewSingleUserDetail[0].lastName,
        email: viewSingleUserDetail[0].email,
        employeeId: viewSingleUserDetail[0].employeeId,
        password: viewSingleUserDetail[0].password,
        dateOfBirth: viewSingleUserDetail[0].personalDetails.dateOfBirth,
        profile: viewSingleUserDetail[0].profile,
        department: viewSingleUserDetail[0].department,
        dateOfHire: viewSingleUserDetail[0].dateOfHire,
        employeeStatus: viewSingleUserDetail[0].employeeStatus,
        employeeType: viewSingleUserDetail[0].employeeType,
        title: viewSingleUserDetail[0].title,
        sourceOfHire: viewSingleUserDetail[0].sourceOfHire,
        workPhone: viewSingleUserDetail[0].workPhone,
        salary: viewSingleUserDetail[0].salary,
        payType: viewSingleUserDetail[0].payType,
        passportNumber: viewSingleUserDetail[0].passportNumber,
        maritalStatus: viewSingleUserDetail[0].personalDetails.maritalStatus,
        gender: viewSingleUserDetail[0].personalDetails.gender,
        address1: viewSingleUserDetail[0].personalDetails.address1,
        address2: viewSingleUserDetail[0].personalDetails.address2,
        city: viewSingleUserDetail[0].personalDetails.city,
        state: viewSingleUserDetail[0].personalDetails.state,
        country: viewSingleUserDetail[0].personalDetails.country,
        mobile: viewSingleUserDetail[0].personalDetails.mobile,
        otherEmail: viewSingleUserDetail[0].personalDetails.otherEmail,
      });
    }
  }

  // Safe getter method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.userEditForm.get(controlName);
    return (control?.invalid && control?.touched) || false;
  }

  onFileSelected(event: any) {
    this.profileImage = event.target.files[0];
  }

  onSubmit() {
    this.spinner.show();
    const userToken = localStorage.getItem("adminToken");
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const parseUserData = [JSON.parse(viewUserData)];
    const userId = parseUserData[0]._id;

    // Mark all form controls as touched
    this.markFormGroupTouched(this.userEditForm);

    if (this.userEditForm.valid) {
      const formData = new FormData();
      const formValues = this.userEditForm.value;

      // Append form values to FormData
      Object.keys(formValues).forEach((key) => {
        if (key != 'profile') {
          formData.append(key, formValues[key]);
        }
      });

      formData.append('profile', this.profileImage);

      this.httpAdmin
        .updateUserPersonalDetail(userId, userToken, formData)
        .subscribe({
          next:(res) => {
            this.spinner.hide();
            let setEdittedUserData = res.data;
            localStorage.setItem("viewAdminUser", JSON.stringify(setEdittedUserData));
            this.cdr.detectChanges();
            this.router.navigateByUrl("/adminViewUserDetails");
            this.toastr.success("Update Successfully");
          },
          error: (error) => {
            this.spinner.hide();
            this.toastr.error("Something went wrong");
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
