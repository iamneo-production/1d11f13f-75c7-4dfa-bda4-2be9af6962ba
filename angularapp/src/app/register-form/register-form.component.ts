import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterFormService } from '../register-form.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [RegisterFormService]
})
export class RegisterFormComponent {
  registerForm: FormGroup;
  submitted = false;
  passwordVisible = false;
  confirmPasswordVisible = false;
  emailExists = false;
  phoneNumberExists = false;
  emailError: string = '';
  phoneNumberError: string = '';
  successMessage!: string;
  

  constructor(
    private formBuilder: FormBuilder,
    private registerFormService: RegisterFormService,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          RegisterFormService.lowercaseEmailValidator()
        ]
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
          RegisterFormService.passwordValidator()
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.registerFormService.checkEmailExists(formData.email).subscribe(
        (emailExists: boolean) => {
          this.emailExists = emailExists;

          if (emailExists) {
            this.f['email'].setErrors({ emailExists: true });
          } else {
            this.registerFormService.checkphoneNumberExists(formData.phoneNumber).subscribe(
              (phoneNumberExists: boolean) => {
                this.phoneNumberExists = phoneNumberExists;

                if (phoneNumberExists) {
                  this.f['phoneNumber'].setErrors({ phoneNumberExists: true });
                } else {
                  this.registerFormService.saveFormData(formData).subscribe(
                    (_response) => {
                      // Display success message
                      console.log('Register form submitted successfully');
                     
                    },
                    (error) => {
                      if (error.status === 200) {
                        console.log('Register form submitted successfully');
                        this.successMessage = 'Register form submitted successfully';
                        // Display success message
                      } else if (error.status === 400) {
                        console.error('Error saving form data:', error.error);
                        // Display error message for invalid data
                      } else {
                        console.error('Failed to save form data:', error);
                        // Display error message for other errors
                      }
                    }
                  );
                }
              },
              (error: any) => {
                console.error('Error checking phoneNumber existence:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error checking email existence:', error);
        }
      );
    }
  }
}