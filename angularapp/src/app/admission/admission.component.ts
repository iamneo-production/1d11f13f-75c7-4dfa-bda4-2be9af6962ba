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
    fname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(3)
    ]),
    lname: new FormControl('', [
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
    phone: new FormControl('', [
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
        this.courses = data.map(course => course.course_name);
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', '0');

    const fname = this.admissionForm.get('fname')!.value;
    const lname = this.admissionForm.get('lname')!.value;
    const email = this.admissionForm.get('email')!.value;
    const address = this.admissionForm.get('address')!.value;
    const phone = this.admissionForm.get('phone')!.value;
    const course = this.admissionForm.get('course')!.value;
    const documents = this.admissionForm.get('documents')!.value;

    if (fname) {
      formData.append('fname', fname);
    }
    if (lname) {
      formData.append('lname', lname);
    }
    if (email) {
      formData.append('email', email);
    }
    if (address) {
      formData.append('address', address);
    }
    if (phone) {
      formData.append('phone', phone);
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

  get fname() {
    return this.admissionForm.get('fname');
  }

  get lname() {
    return this.admissionForm.get('lname');
  }

  get email() {
    return this.admissionForm.get('email');
  }

  get address() {
    return this.admissionForm.get('address');
  }

  get phone() {
    return this.admissionForm.get('phone');
  }

  get course() {
    return this.admissionForm.get('course');
  }

  get documents() {
    return this.admissionForm.get('documents');
  }
}
