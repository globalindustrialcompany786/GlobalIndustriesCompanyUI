import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiUserUrl = 'https://globalindustriescompanybackend.onrender.com/api/user';
  private apiWorkExperienceUrl = 'https://globalindustriescompanybackend.onrender.com/api/workExperience';
  private apiDependantUrl = 'https://globalindustriescompanybackend.onrender.com/api/dependant';
  private apiEducationUrl = 'https://globalindustriescompanybackend.onrender.com/api/education';

  private userDataSubject = new BehaviorSubject<any>(null);
  userData = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userDataSubject.next(JSON.parse(storedData));
    }
  }

  userLogin(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUserUrl}/login-user`, data, { headers });
  }

  getUserImage(imageUrlPath:string){
    return this.http.get<any>(`https://globalindustriescompanybackend.onrender.com/${imageUrlPath}`)
  }

  updateUserPersonalDetail(userToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'token': userToken
    });

    return this.http.put<any>(`${this.apiUserUrl}/update-user`, body, { headers });
  }

  updateEducationDetail(userToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'token': userToken
    });

    return this.http.put<any>(`${this.apiEducationUrl}/update-education`, body, { headers });
  }

  updateDependentDetail(userToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'token': userToken
    });

    return this.http.put<any>(`${this.apiDependantUrl}/update-dependant`, body, { headers });
  }

  updateWorkExperienceDetail(userToken: any, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${userToken}`,
      'token': userToken
    });
    return this.http.put<any>(`${this.apiWorkExperienceUrl}/update-workExperience`, body, { headers });
  }

  setUserData(data: any) {
    // Update the BehaviorSubject
    this.userDataSubject.next(data);

    // Store the data in localStorage
    localStorage.setItem('userData', JSON.stringify(data));
  }

  isUserLoggedIn(): boolean {
    const storedData = localStorage.getItem('userData');
    return storedData !== null; // Return true if user data is present in local storage
  }

}
