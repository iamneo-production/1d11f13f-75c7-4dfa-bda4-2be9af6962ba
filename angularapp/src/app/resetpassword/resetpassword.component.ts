
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetpasswordService } from '../resetpassword.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
  providers:[ResetpasswordService]
})
export class ResetpasswordComponent implements OnInit {
  static newpasswordValidator: any;
  [x: string]: any;
  passwordForm!: FormGroup;
  formsubmitted=false;
  matchPassword: any;
  fileSizeError = false;
  passwordUpdateMessage: string = '';
 

  constructor(
    private formBuilder: FormBuilder,
    private resetpasswordService: ResetpasswordService
  ) {
   
  }
 
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        newPassword: ['', [Validators.required, Validators.minLength(8),this.resetpasswordService.newPasswordValidator]],
        confirmPassword: ['',Validators.required],
      },
      {
        validator: ResetpasswordService.passwordMatchValidator,
      }
    );
    }
  get passwordFormControls() {
    return this.passwordForm.controls;
  }

   passwordMatchValidator(control: AbstractControl) {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }
  


  onResetPasswordSubmit(): void {
    this.formsubmitted = true;
    if (
      this.passwordForm.controls['email'].hasError('required') ||
      this.passwordForm.controls['newPassword'].hasError('required') ||
      this.passwordForm.controls['confirmPassword'].hasError('required')
    ) {
      // Set the validation messages for the empty fields
      this.passwordForm.controls['email'].markAsTouched();
      this.passwordForm.controls['newPassword'].markAsTouched();
      this.passwordForm.controls['confirmPassword'].markAsTouched();
  
      return;
    }
  
    if (this.passwordForm.valid) {
      const email = this.passwordForm.controls['email'].value;
      const newPassword = this.passwordForm.controls['newPassword'].value;
  
      // Call your backend API to update the password
      this.resetpasswordService.updatePassword(email, newPassword).subscribe(
        (_response: any) => {
          // Handle successful password update, e.g., show success message
          this.passwordUpdateMessage = 'Password updated successfully';
        },
        (error: any) => {
          if (error.status === 200) {
            this.passwordUpdateMessage = 'Password updated successfully!!!';
            console.log('Password updated successfully');
          } else if (error.status === 400) {
            console.error('Error updating password:', error.error);
            this.passwordUpdateMessage = 'Enter the valid email id';
          } else {
            console.error('Failed to update password:', error);
            this.passwordUpdateMessage = 'Enter the valid email id!';
          }
        }
      );
    }
  }
  


  activeField: string = '';
  showPassword: boolean = false;
  showPasswordIcons = new Set<string>();

  togglePasswordVisibility(field: string) {
    this.activeField = field;
    this.showPassword = !this.showPassword;
    if (this.showPasswordIcons.has(field)) {
      this.showPasswordIcons.delete(field);
    } else {
      this.showPasswordIcons.add(field);
    }
  }
}