import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AdminLoginService } from "src/app/api/adminLogin.service";
import { UserLoginService } from "src/app/api/userLogin.service";

@Component({
  selector: "app-user-dash-board",
  templateUrl: "./user-dash-board.component.html",
  styleUrls: ["./user-dash-board.component.css"],
})
export class UserDashBoardComponent implements OnInit {
  private userId!: string;
  userProfile: Array<any> = [];
  personalDetailForm!: FormGroup;
  workExperinceForm!: FormGroup;
  highestEducationForm!: FormGroup;
  dependentForm!: FormGroup;
  userImage: any;
  fullName!: string;

  constructor(
    private httpUser: UserLoginService,
    private httpAdmin: AdminLoginService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
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

  ngOnInit(): void {
    this.getUserData();
    this.getUserProfileImage();
  }

  getUserData() {
    let data: any = localStorage.getItem("userData");
    this.userProfile = [JSON.parse(data)];
    this.bindFormValue();
  }

  getUserProfileImage() {
    this.httpUser.getUserImage(this.userProfile[0].image).subscribe({
      next: (data: any) => {
      },
      error: err => {
        this.userImage = err.url;
      }
    })
  }

  bindFormValue() {
    this.personalDetailForm.patchValue({
      maritalStatus: this.userProfile[0]?.personalDetails?.maritalStatus,
      dateOfBirth: this.userProfile[0]?.personalDetails?.dateOfBirth,
      address1: this.userProfile[0]?.personalDetails?.address1,
      address2: this.userProfile[0]?.personalDetails?.address2,
      city: this.userProfile[0]?.personalDetails?.city,
      state: this.userProfile[0]?.personalDetails?.state,
      country: this.userProfile[0]?.personalDetails?.country,
      mobile: this.userProfile[0]?.personalDetails?.mobile,
      otherEmail: this.userProfile[0]?.personalDetails?.otherEmail,
    });

    this.workExperinceForm.patchValue({
      previousCompany: this.userProfile[0]?.workExperience?.previousCompany,
      fromDate: this.userProfile[0]?.workExperience?.fromDate,
      toDate: this.userProfile[0]?.workExperience?.toDate,
      jobDescription: this.userProfile[0]?.workExperience?.jobDescription,
    });

    this.highestEducationForm.patchValue({
      schoolName: this.userProfile[0]?.education?.schoolName,
      degree: this.userProfile[0]?.education?.degree,
      fieldOfStudy: this.userProfile[0]?.education?.fieldOfStudy,
      yearOfCompletion: this.userProfile[0]?.education?.yearOfCompletion,
    });

    this.dependentForm.patchValue({
      name: this.userProfile[0]?.dependant?.name,
      relation: this.userProfile[0]?.dependant?.relation,
      dateOfBirth: this.userProfile[0]?.dependant?.dateOfBirth,
    });
  }

  print() {
    window.print();
  }

  offerLetterDownload(userId: any) {
    const userToken = localStorage.getItem("usertoken");

    this.httpAdmin.offerLetterDownload(userId, userToken).subscribe({
      next: (res: Blob) => {
        let getUserData = localStorage.getItem("userData");
        if (getUserData) {
          let convertedUserData = JSON.parse(getUserData);
          if (convertedUserData._id === userId) {
            this.fullName = `${convertedUserData.firstName} ${convertedUserData.lastName}`
          }
        }

        // Create object URL for the blob response
        const blobUrl = URL.createObjectURL(res);

        // Create an anchor element to trigger download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = `${this.fullName} Offer Letter.pdf`;

        // Hide the anchor element
        a.style.display = 'none';

        // Append anchor element to the body and trigger click event to start download
        document.body.appendChild(a);
        a.click();

        // Cleanup
        URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);

        // Show success notification
        this.toastr.success("Offer Letter Download Successful");
      },
      error: () => {
        this.toastr.error("Your offer letter is not available.");
      }
    });
  }

  onUpdatePersonalDetails() {
    this.spinner.show();
    const userToken = localStorage.getItem("usertoken");
    this.httpUser
      .updateUserPersonalDetail(userToken, this.personalDetailForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.userProfile[0].personalDetails = res.data.personalDetails;
          let setUserEducationData = this.userProfile[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "userData",
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
    const userToken = localStorage.getItem("usertoken");
    this.httpUser
      .updateWorkExperienceDetail(userToken, this.workExperinceForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.userProfile[0].workExperience = res.data;
          let setUserEducationData = this.userProfile[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "userData",
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
    const userToken = localStorage.getItem("usertoken");
    this.httpUser
      .updateEducationDetail(userToken, this.highestEducationForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.userProfile[0].education = res.data;
          let setUserEducationData = this.userProfile[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "userData",
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
    const userToken = localStorage.getItem("usertoken");
    this.httpUser
      .updateDependentDetail(userToken, this.dependentForm.value)
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.userProfile[0].dependant = res.data;
          let setUserDependentData = this.userProfile[0];
          // Update localStorage with the new data
          localStorage.setItem(
            "userData",
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
