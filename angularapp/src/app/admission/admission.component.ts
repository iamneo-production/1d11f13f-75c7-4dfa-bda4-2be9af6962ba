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

  // checkApplicationStatus() {
  //   alert('Status: Submit Your Form First');
  // }

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
    const course = this.admissionForm.get('course')!.value;
    const documents = this.admissionForm.get('documents')!.value;

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

 

  get course() {
    return this.admissionForm.get('course');
  }

  get documents() {
    return this.admissionForm.get('documents');
  }
}
