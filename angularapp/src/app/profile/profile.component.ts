import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/service/profile.service';
import { Profile } from 'src/app/class/profile';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  submitted = false;
  emailError: string = '';
  phoneNumberError: string = '';
  successMessage!: string;
  phoneNumberExists!: boolean;
  emailExists!: boolean;
  editMode = false;
  profile!: Profile; // Declare the profile property

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private http: HttpClient
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
          ProfileService.lowercaseEmailValidator()
        ]
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.profileService.getLoggedInUserProfile().subscribe(
      (profile) => {
        this.profile = profile;
        this.profileForm.patchValue(profile); // Patch the form with the retrieved profile data
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    
    if (!this.editMode) {
      // If exiting edit mode, reset the form with the original profile data
      this.profileForm.reset(this.profile);
    }
  }

  updateProfile(): void {
    this.submitted = true;
  
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
  
      this.profileService.checkEmailExists(formData.email).subscribe(
        (emailExists: boolean) => {
          this.emailExists = emailExists;
  
          if (emailExists) {
            this.f['email'].setErrors({ emailExists: true });
          } else {
            this.profileService.checkPhoneNumberExists(formData.phoneNumber).subscribe(
              (phoneNumberExists: boolean) => {
                this.phoneNumberExists = phoneNumberExists;
  
                if (phoneNumberExists) {
                  this.f['phoneNumber'].setErrors({ phoneNumberExists: true });
                } else {
                  this.profileService.updateProfile(formData).subscribe(
                    (_response) => {
                      // Display success message
                      console.log('Profile updated successfully');
                      this.successMessage = 'Profile updated successfully';
                    },
                    (error) => {
                      if (error.status === 200) {
                        console.log('Profile updated successfully');
                        this.successMessage = 'Profile updated successfully';
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
                // Handle error
              }
            );
          }
        },
        (error: any) => {
          // Handle error
        }
      );
    }
  }
}
