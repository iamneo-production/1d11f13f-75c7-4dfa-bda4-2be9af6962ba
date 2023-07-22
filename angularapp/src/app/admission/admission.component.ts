import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent {
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
    documents : new FormControl('', [
      Validators.required,
      (control: AbstractControl) => {
        if (this.isFileSizeExceeded) {
          return { fileSizeExceeded: true };
        }
        return null;
      }
    ])
   
  });

  constructor(private http: HttpClient) {}

  selectedFileSize: number | undefined;
isFileSizeExceeded: boolean = false;

onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const fileSizeInKB = Math.round(file.size / 1024); // Convert to KB
    this.selectedFileSize = fileSizeInKB;
    console.log('Selected file size:', this.selectedFileSize, 'KB');

    if (fileSizeInKB > 60) {
      console.log('Validation error: File size exceeds 60KB');
      this.isFileSizeExceeded = false;
      // Show your validation message here
    } else {
      this.isFileSizeExceeded = true;
    }
  } else {
    this.selectedFileSize = undefined;
    this.isFileSizeExceeded = true;
  }
}

  onSubmit() {
    const formData = new FormData();
    formData.append('id', '0');

    const fname = this.admissionForm.get('fname')!.value;
    const lname = this.admissionForm.get('lname')!.value;
    const email = this.admissionForm.get('email')!.value;
    const address = this.admissionForm.get('address')!.value;
    const phone = this.admissionForm.get('phone')!.value;
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
    if (documents) {
      formData.append('documents', documents);
    }

    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      formData.append('pdfFile', file);
    }

    this.http.post('http://localhost:8080/students/store', formData).subscribe(
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

  get documents() {
    return this.admissionForm.get('documents');
  }
}
