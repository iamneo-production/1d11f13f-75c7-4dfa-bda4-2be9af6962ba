import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AdmissionService } from './admission.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  courses: string[] = [];
  admissionForm = new FormGroup({
    id: new FormControl(0),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]+$')
    ]),
    course: new FormControl('', [
      Validators.required
    ]),
    documents: new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        if (this.isFileSizeExceeded) {
          return { fileSizeExceeded: true };
        }
        return null;
      }
    ])
  });

  constructor(private admissionService: AdmissionService) {}

  selectedFileSize: number | undefined;
  isFileSizeExceeded: boolean = false;

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.admissionService.fetchCourses().subscribe(
      (data) => {
        console.log(data);
        this.courses = data.map(course => course.name);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', '0');

    const firstName = this.admissionForm.get('firstName')!.value;
    const lastName = this.admissionForm.get('lastName')!.value;
    const email = this.admissionForm.get('email')!.value;
    const address = this.admissionForm.get('address')!.value;
    const phoneNumber = this.admissionForm.get('phoneNumber')!.value;
    const course = this.admissionForm.get('course')!.value;
    const documents = this.admissionForm.get('documents')!.value;

    if (firstName) {
      formData.append('firstName', firstName);
    }
    if (lastName) {
      formData.append('lastName', lastName);
    }
    if (email) {
      formData.append('email', email);
    }
    if (address) {
      formData.append('address', address);
    }
    if (phoneNumber) {
      formData.append('phoneNumber', phoneNumber);
    }
    if (course) {
      formData.append('course', course);
    }
    if (documents) {
      formData.append('documents', documents);
    }

    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('pdfFile', file);
    }

    this.admissionService.submitAdmissionForm(formData).subscribe(
      (response) => {
        console.log(response);
        alert('Data Saved Successfully');
        console.log('Form data sent successfully', response);
        this.admissionForm.reset();
      },
      (error) => {
        console.error('Error while sending form data', error);
      }
    );
  }

  get firstName() {
    return this.admissionForm.get('firstName');
  }

  get lastName() {
    return this.admissionForm.get('lastName');
  }

  get email() {
    return this.admissionForm.get('email');
  }

  get address() {
    return this.admissionForm.get('address');
  }

  get phoneNumber() {
    return this.admissionForm.get('phoneNumber');
  }

  get course() {
    return this.admissionForm.get('course');
  }

  get documents() {
    return this.admissionForm.get('documents');
  }
}
