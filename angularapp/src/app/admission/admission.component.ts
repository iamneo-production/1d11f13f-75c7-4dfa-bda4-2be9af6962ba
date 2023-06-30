import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent {
  admissionForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    fatherName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required
    ]),
    qualification: new FormControl('', [
      Validators.required
    ]),
    percentage: new FormControl('', [
      Validators.required,
      Validators.max(100)
    ]),
    correspondingDocuments: new FormControl('', [
      Validators.required
    ]),
    passingYear: new FormControl('', [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear())
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    city: new FormControl('', [
      Validators.required
    ]),
    state: new FormControl('', [
      Validators.required
    ]),
    zipcode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ])
  });

  onSubmit() {
    console.warn(this.admissionForm.value);
  }

  get name() {
    return this.admissionForm.get('name');
  }

  get fatherName() {
    return this.admissionForm.get('fatherName');
  }

  get phoneNumber() {
    return this.admissionForm.get('phoneNumber');
  }

  get email() {
    return this.admissionForm.get('email');
  }

  get dateOfBirth() {
    return this.admissionForm.get('dateOfBirth');
  }

  get gender() {
    return this.admissionForm.get('gender');
  }

  get qualification() {
    return this.admissionForm.get('qualification');
  }

  get percentage() {
    return this.admissionForm.get('percentage');
  }

  get correspondingDocuments() {
    return this.admissionForm.get('correspondingDocuments');
  }

  get passingYear() {
    return this.admissionForm.get('passingYear');
  }

  get address() {
    return this.admissionForm.get('address');
  }

  get city() {
    return this.admissionForm.get('city');
  }

  get state() {
    return this.admissionForm.get('state');
  }

  get zipcode() {
    return this.admissionForm.get('zipcode');
  }
}
