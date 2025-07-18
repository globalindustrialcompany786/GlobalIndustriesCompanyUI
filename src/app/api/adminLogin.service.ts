import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminLoginService {
  private adminApiUrl = "https://globalindustriescompanybackend.onrender.com/api/admin";

  private userRegisterUrl = "https://globalindustriescompanybackend.onrender.com/api/user";

  private apiWorkExperienceUrl = 'https://globalindustriescompanybackend.onrender.com/api/workExperience';
  private apiDependantUrl = 'https://globalindustriescompanybackend.onrender.com/api/dependant';
  private apiEducationUrl = 'https://globalindustriescompanybackend.onrender.com/api/education';

  constructor(private http: HttpClient) {
  }

  adminLogin(body: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post<any>(`${this.adminApiUrl}/login-admin`, body, { headers });
  }

  getAllUsers(token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'token': token
    });

    return this.http.get<any>(`${this.adminApiUrl}/get-all-users`, { headers });
  }

  getUserDetails(token: any, userId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'token': token
    });

    return this.http.get<any>(`${this.adminApiUrl}/get-one-users?userId=${userId}`, { headers });
  }

  registerUser(adminToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    return this.http.post<any>(`${this.userRegisterUrl}/register-user`, body, {
      headers,
    });
  }

  updateUserPersonalDetail(userId: any, adminToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    return this.http.put<any>(`${this.userRegisterUrl}/update-user?userId=${userId}`, body, { headers });
  }

  updateEducationDetail(userId: any, adminToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    return this.http.put<any>(`${this.apiEducationUrl}/update-education?userId=${userId}`, body, { headers });
  }

  updateDependentDetail(userId: any, adminToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    return this.http.put<any>(`${this.apiDependantUrl}/update-dependant?userId=${userId}`, body, { headers });
  }

  offerLetterDownload(userId: any, adminToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    // Set responseType to 'blob' to treat response as binary data
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };

    return this.http.get(`${this.apiDependantUrl}/download-offer-letter?userId=${userId}`, options);
  }

  updateWorkExperienceDetail(userId: any, userToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'token': userToken
    });
    return this.http.put<any>(`${this.apiWorkExperienceUrl}/update-workExperience?userId=${userId}`, body, { headers });
  }

  deleteUser(adminToken: any, userId: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${adminToken}`,
      'token': adminToken
    });

    return this.http.delete<any>(`${this.adminApiUrl}/delete-one-user?userId=${userId}`, { headers });
  }

  isAdminLoggedIn(): boolean {
    const storedData = localStorage.getItem("adminData");
    return storedData !== null; // Return true if user data is present in local storage
  }
}
