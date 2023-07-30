import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import {Profile} from '../class/profile';
import { LoginService } from './login.service';
// import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'https://8080-bedceacbedadadbcefbeacfaceadeaeaadbdbabf.project.examly.io/home'; // Update with your API endpoint URL
  //private headers: HttpHeaders;

  // constructor(private http: HttpClient) {
  //   this.headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  // }


  // private baseUrl = 'http://localhost:8081'; // Update with your API endpoint URL
  
  

  constructor(private http: HttpClient,private injector: Injector) {}
  
  private get loginService(): LoginService {
    return this.injector.get(LoginService);
  }

  getLoggedInUserProfile(): Observable<Profile> {
    const userId = localStorage.getItem('userId'); // Retrieve the stored user ID
    if (!userId) {
      // Handle the case when the userId is not found in local storage
      return throwError('User ID not found in local storage');
    }
    const token = this.loginService.getToken(); // Retrieve the JWT token from the LoginService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<Profile>(url, { headers });
  }
  
  updateProfile(profile: Profile): Observable<Profile> {
    const userId = localStorage.getItem('userId'); // Retrieve the stored user ID
    const url = `${this.baseUrl}/update/${userId}`;
    return this.http.put<Profile>(url, profile);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/email/${email}`;
    return this.http.get<boolean>(url).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }

  checkPhoneNumberExists(phoneNumber: string): Observable<boolean> {
    const url = `${this.baseUrl}/phoneNumber/${phoneNumber}`;
    return this.http.get<boolean>(url).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }


 
  static lowercaseEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email && email !== email.toLowerCase()) {
        return { lowercaseEmail: true };
      }
      return null;
    };
  }

}

  


