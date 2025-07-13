import { ChangeDetectorRef, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AdminLoginService } from "src/app/api/adminLogin.service";
import { UserLoginService } from "src/app/api/userLogin.service";

@Component({
  selector: "app-admin-view-user-details",
  templateUrl: "./admin-view-user-details.component.html",
  styleUrls: ["./admin-view-user-details.component.css"],
})
export class AdminViewUserDetailsComponent {
  viewSingleUserDetail: Array<any> = [];
  personalDetailForm!: FormGroup;
  workExperinceForm!: FormGroup;
  highestEducationForm!: FormGroup;
  dependentForm!: FormGroup;
  userImage!: string;

  constructor(private http: AdminLoginService,
    private httpUser: UserLoginService,
    private httpAdmin: AdminLoginService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.personalDetailForm = this.fb.group({
      maritalStatus: [],
      dateOfBirth: [],
      address1: [],
      address2: [],
      city: [],
      state: [],
      country: [],
      mobile: [],
      otherEmail: [],
    });

    this.workExperinceForm = this.fb.group({
      previousCompany: [],
      fromDate: [],
      toDate: [],
      jobDescription: [],
    });

    this.highestEducationForm = this.fb.group({
      schoolName: [],
      degree: [],
      fieldOfStudy: [],
      yearOfCompletion: [],
    });

    this.dependentForm = this.fb.group({
      name: [],
      relation: [],
      dateOfBirth: [],
    });
  }

  ngOnInit() {
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    this.viewSingleUserDetail = [JSON.parse(viewUserData)];
    this.bindFormValue();
    this.getUserProfileImage();
  }

  bindFormValue() {
    this.personalDetailForm.patchValue({
      maritalStatus: this.viewSingleUserDetail[0]?.personalDetails?.maritalStatus,
      dateOfBirth: this.viewSingleUserDetail[0]?.personalDetails?.dateOfBirth,
      address1: this.viewSingleUserDetail[0]?.personalDetails?.address1,
      address2: this.viewSingleUserDetail[0]?.personalDetails?.address2,
      city: this.viewSingleUserDetail[0]?.personalDetails?.city,
      state: this.viewSingleUserDetail[0]?.personalDetails?.state,
      country: this.viewSingleUserDetail[0]?.personalDetails?.country,
      mobile: this.viewSingleUserDetail[0]?.personalDetails?.mobile,
      otherEmail: this.viewSingleUserDetail[0]?.personalDetails?.otherEmail,
    });

    this.workExperinceForm.patchValue({
      previousCompany: this.viewSingleUserDetail[0]?.workExperience?.previousCompany,
      fromDate: this.viewSingleUserDetail[0]?.workExperience?.fromDate,
      toDate: this.viewSingleUserDetail[0]?.workExperience?.toDate,
      jobDescription: this.viewSingleUserDetail[0]?.workExperience?.jobDescription,
    });

    this.highestEducationForm.patchValue({
      schoolName: this.viewSingleUserDetail[0]?.education?.schoolName,
      degree: this.viewSingleUserDetail[0]?.education?.degree,
      fieldOfStudy: this.viewSingleUserDetail[0]?.education?.fieldOfStudy,
      yearOfCompletion: this.viewSingleUserDetail[0]?.education?.yearOfCompletion,
    });

    this.dependentForm.patchValue({
      name: this.viewSingleUserDetail[0]?.dependant?.name,
      relation: this.viewSingleUserDetail[0]?.dependant?.relation,
      dateOfBirth: this.viewSingleUserDetail[0]?.dependant?.dateOfBirth,
    });
  }

  getUserProfileImage() {
    this.httpUser.getUserImage(this.viewSingleUserDetail[0]?.image).subscribe({
      next: (data: any) => {
      },
      error: err => {
        this.userImage = err.url;
      }
    })
  }

  backToDashBoard() {
    localStorage.removeItem("viewAdminUser");
    this.router.navigateByUrl("/adminDashBoard");
  }

  print() {
    window.print(); // This will open the browser's print dialog
  }

  onUpdatePersonalDetails() {
    this.spinner.show();
    const userToken = localStorage.getItem("adminToken");
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const parseUserData = [JSON.parse(viewUserData)];
    const userId = parseUserData[0]?._id;
    this.httpAdmin
      .updateUserPersonalDetail(userId, userToken, this.personalDetailForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.viewSingleUserDetail[0].personalDetails = res.data.personalDetails;
          let setUserEducationData = this.viewSingleUserDetail[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "viewAdminUser",
            JSON.stringify(setUserEducationData)
          );
          this.cdr.detectChanges();
          this.toastr.success("Update Successfully");
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error("Someting went Wrong");
        }
      });
  }

  onUpdateWorkExperince() {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const parseUserData = [JSON.parse(viewUserData)];
    const userId = parseUserData[0]?._id;
    this.httpAdmin
      .updateWorkExperienceDetail(userId, adminToken, this.workExperinceForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.viewSingleUserDetail[0].workExperience = res.data;
          let setUserEducationData = this.viewSingleUserDetail[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "viewAdminUser",
            JSON.stringify(setUserEducationData)
          );
          this.cdr.detectChanges();
          this.toastr.success("Update Successfully");
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error("Someting went Wrong");
        }
      });
  }

  onUpdateHigestEducation() {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const parseUserData = [JSON.parse(viewUserData)];
    const userId = parseUserData[0]._id;
    this.httpAdmin
      .updateEducationDetail(userId, adminToken, this.highestEducationForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.viewSingleUserDetail[0].education = res.data;
          let setUserEducationData = this.viewSingleUserDetail[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "viewAdminUser",
            JSON.stringify(setUserEducationData)
          );
          this.cdr.detectChanges();
          this.toastr.success("Update Successfully");
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error("Someting went Wrong");
        }
      });
  }

  onUpdateDependent() {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    const viewUserData: any = localStorage.getItem("viewAdminUser");
    const parseUserData = [JSON.parse(viewUserData)];
    const userId = parseUserData[0]._id;
    this.httpAdmin
      .updateDependentDetail(userId, adminToken, this.dependentForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.viewSingleUserDetail[0].dependant = res.data;
          let setUserDependentData = this.viewSingleUserDetail[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "viewAdminUser",
            JSON.stringify(setUserDependentData)
          );
          this.cdr.detectChanges();
          this.toastr.success("Update Successfully");
        },
        error: (error) => {
          this.spinner.hide();
          this.toastr.error("Someting went Wrong");
        }
      });
  }
}
