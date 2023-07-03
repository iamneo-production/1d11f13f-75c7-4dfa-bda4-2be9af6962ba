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
  contactnoExists = false;
  emailError: string = '';
  contactnoError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerFormService: RegisterFormService,
    private http: HttpClient
  ) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          RegisterFormService.lowercaseEmailValidator()
        ]
      ],
      contactno: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
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
            this.registerFormService.checkContactnoExists(formData.contactno).subscribe(
              (contactnoExists: boolean) => {
                this.contactnoExists = contactnoExists;

                if (contactnoExists) {
                  this.f['contactno'].setErrors({ contactnoExists: true });
                } else {
                  this.registerFormService.saveFormData(formData).subscribe(
                    (response) => {
                      // Display success message
                      alert('Register form submitted successfully');
                    },
                    (error) => {
                      console.error('Error saving form data:', error);
                      // Display error message to the user if needed
                    }
                  );
                }
              },
              (error) => {
                console.error('Error checking contact number existence:', error);
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
