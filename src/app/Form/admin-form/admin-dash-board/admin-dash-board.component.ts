import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminLoginService } from 'src/app/api/adminLogin.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css'],
})
export class AdminDashBoardComponent {
  getAllUsers: Array<any> = [];
  userData: Array<any> = [];
  adminUserData: any;
  fullName!: String;

  @Output() userDetails = new EventEmitter<any>();

  constructor(
    private router: Router,
    private httpAdmin: AdminLoginService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    const adminData = localStorage.getItem('adminData');
    if (adminData) {
      try {
        this.adminUserData = JSON.parse(adminData);
      } catch (error) {
        this.toastr.error("Something went wrong!");
      }
    }
    this.getAllUserData();
  }

  getAllUserData() {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    this.httpAdmin.getAllUsers(adminToken).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.getAllUsers = res.data;
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.message);
      }
    });
  }

  logout() {
    localStorage.removeItem('adminData');
    localStorage.removeItem("adminToken");
    localStorage.removeItem("viewAdminUser");
    this.isAdminLoggedIn();
    this.router.navigateByUrl('/adminForm');
  }

  isAdminLoggedIn() {
    const storedData = localStorage.getItem('adminData');
    if (storedData) {
      return true; // User is logged in
    }
    return false; // User is not logged in
  }

  viewUserDetails(userId: any) {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    this.httpAdmin.getUserDetails(adminToken, userId).subscribe({
      next: (res) => {
        this.spinner.hide();
        localStorage.setItem("viewAdminUser", JSON.stringify(res.data));
        this.router.navigateByUrl("/adminViewUserDetails");
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.message);
      }
    });
  }

  selectFile(userId: any) {
    const fileUploadElement = document.getElementById('fileUpload_' + userId);
    if (fileUploadElement) {
      fileUploadElement.click();
    }
  }

  offerLetterUpload(event: any) {
    const userId = event.target.id.split('_')[1]; // Extract userId from the id attribute

    const adminToken = localStorage.getItem("adminToken");
    const file: File = event.target.files[0];

    if (file && userId) {
      const formData = new FormData();
      formData.append('offerLetter', file);

      this.httpAdmin
        .updateDependentDetail(userId, adminToken, formData)
        .subscribe({
          next: () => {
            this.toastr.success("Offer Letter Uploaded Successfully");

            // Reset the file input after successful upload
            event.target.value = null;
          },
          error: () => this.toastr.error("Failed to Upload Offer Letter")
        });
    }
  }

  async offerLetterDownload(userId: any) {
    const adminToken = localStorage.getItem("adminToken");

    try {
      const offerLetterResponse: Blob = await new Promise((resolve, reject) => {
        this.httpAdmin.offerLetterDownload(userId, adminToken).subscribe({
          next: (res: Blob) => {
            resolve(res);
          },
          error: (error) => {
            reject(error);
          }
        });
      });

      let userDetailsResponse: any = await new Promise((resolve, reject) => {
        this.httpAdmin.getUserDetails(adminToken, userId).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error) => {
            reject(error);
          }
        });
      });

      this.spinner.hide();

      localStorage.setItem("viewAdminUser", JSON.stringify(userDetailsResponse.data));

      let getUserData = localStorage.getItem("viewAdminUser");

      if (getUserData) {
        let convertedUserData = JSON.parse(getUserData);
        if (convertedUserData._id === userId) {
          this.fullName = `${convertedUserData.firstName} ${convertedUserData.lastName}`;
        }
      }

      // Create object URL for the blob response
      const blobUrl = URL.createObjectURL(offerLetterResponse);

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

      //After fetching the user name clear the local storage
      localStorage.removeItem("viewAdminUser");

    } catch (error) {
      this.spinner.hide();
      this.toastr.error("Offer letter not available. Please upload the offer letter.");
    }
  }

  async editUserDetail(userId: any) {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    this.httpAdmin.getUserDetails(adminToken, userId).subscribe({
      next: (res) => {
        this.spinner.hide();
        localStorage.setItem("viewAdminUser", JSON.stringify(res.data));
        this.router.navigateByUrl("/adminEditUserDetails");
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.message);
      }
    });

  }

  deleteUser(userId: any) {
    this.spinner.show();
    const adminToken = localStorage.getItem("adminToken");
    this.httpAdmin.deleteUser(adminToken, userId).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.toastr.success(res.message);
        this.getAllUserData();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error(error.message);
        this.getAllUserData();
      }
    });
  }
}
