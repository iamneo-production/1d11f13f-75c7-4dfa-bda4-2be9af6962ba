import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  static passwordMatchValidator: any;
  constructor(private httpClient: HttpClient) {}
  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL

 updatePassword(email: string, newPassword: string): Observable<any> {
  const url = `${this.apiUrl}/home/resetpassword/${encodeURIComponent(email)}`;
  const body = { newPassword }; // Assuming you need to send the new password in the request body

  return this.httpClient.put(url, body);
}
 // Replace with your actual API endpoint for password update

    // Customize the request payload as per your backend API requirements
   
 

  newPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    if (!hasCapitalLetter || !hasSymbol) {
      return { passwordRequirements: true };
    }

    return null;
  };
}
