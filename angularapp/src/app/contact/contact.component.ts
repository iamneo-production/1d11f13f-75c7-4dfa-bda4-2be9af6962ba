import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private service: ContactService) {}

  ngOnInit() {}

  get firstname() {
    return this.contactForm.get('firstName');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  // onSubmit() {
  //   if (this.contactForm.valid) {
  //     const formData = this.contactForm.value;
  //     this.service.postContactform(formData).subscribe(
  //       (response) => {
  //         console.log(this.contactForm);
  //         this.contactForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error submitting form:', error);
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.service.postContactform(formData).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          this.contactForm.reset();
        },
        (error) => {
          console.error('Error submitting form:', error);
        }
  );
}
}
}