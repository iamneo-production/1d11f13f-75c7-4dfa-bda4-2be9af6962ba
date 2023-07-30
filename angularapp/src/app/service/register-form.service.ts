import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, catchError, of } from 'rxjs';


@Injectable()
export class RegisterFormService {
  constructor(private http: HttpClient) {}

  saveFormData(formData: any) {
    return this.http.post<any>('https://8080-bdfdeabfecfbcefbeacfaceadbffaabaebdcec.project.examly.io/home/register', formData);
  }
 
  checkEmailExists(email: string): Observable<boolean> {
    return this.http
      .get<boolean>(`https://8080-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io/home/check-email/${email}`)
      .pipe(
        catchError(() => {
          // Handle error if needed
          return of(false);
        })
      );
  }

  checkphoneNumberExists(phoneNumber: string): Observable<boolean> {
    return this.http
      .get<boolean>(`https://8080-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io/home/check-phoneNumber/${phoneNumber}`)
      .pipe(
        catchError(() => {
          // Handle error if needed
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

  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const hasCapitalLetter = /[A-Z]/.test(password);
      const hasSymbol = /[!@#$%^&*]/.test(password);

      if (!hasCapitalLetter) {
        return { capitalLetterRequired: true };
      }

      if (!hasSymbol) {
        return { symbolRequired: true };
      }

      return null;
    };
  }
gmailValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  return new Promise((resolve) => {
    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);

    if (domain.toLowerCase() !== 'gmail.com') {
      resolve({ invalidDomain: true });
    } else {
      resolve(null);
    }
  });
}
}

