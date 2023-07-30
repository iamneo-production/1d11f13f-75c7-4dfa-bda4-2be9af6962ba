import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: false // Set the default value to false
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // this.loginService.login(email, password).subscribe(
    //   (response: any) => {
    //     // Login successful
    //     const token = response.token;
    //     const role = response.role;

    //     this.loginService.setToken(token);
    //     this.loginService.setRole(role);

   

  //   this.loginService.login(email, password).subscribe(
  //     (response: any) => {
  //       // Login successful, set token and role
  //       // this.loginService.setTokenAndRole(response);
  //       const token = response.token;
  //       const role = response.role;
        
  //       this.loginService.setToken(token);
  //       this.loginService.setRole(role);

  //       // Store the token in local storage or perform further actions
  //       console.log('Logged in successfully! Token:', this.loginService.getToken());
  //       console.log('Role is: ', this.loginService.getRole());

  //       // if (this.loginService.getRole() === 'ROLE_ADMIN') {
  //       //   this.router.navigate(['/admin-dashboard']);
  //       // } else {
  //       //   this.router.navigate(['/student-dashboard']);
  //       // }
  //       if(role === "ROLE_ADMIN"){
  //       // if (this.loginService.getRole() === "ROLE_ADMIN") {
  //         this.router.navigate(['/admin-dashboard']);
  //       } else {
  //         this.router.navigate(['/student-dashboard']);
  //       }
  //     },
  //     (error: any) => {
  //       // Login failed
  //       this.errorMessage = error.error; // Display the error message in the template
  //     }
  //   );
  // }
  
  
  
  // this.loginService.login(email, password).pipe(
  //   tap((response: any) => {
  //     // Login successful, set token and role
  //     const token = response.token;
  //     const role = response.role;


  // this.loginService.login(email, password).subscribe(
  //   (response: any) => {
  //     // Login successful
  //     const token = response.token;
  //     const role = response.role;
  
//   //     this.loginService.setToken(token);
//   //     this.loginService.setRole(role);
  
//   //     // Store the token in local storage or perform further actions
//   //     console.log('Logged in successfully! Token:', this.loginService.getToken());
//   //     console.log('Role is: ', this.loginService.getRole());
  
//   //     if (role === 'ROLE_ADMIN') {
//   //       this.router.navigate(['/admin-dashboard']);
//   //     } else {
//   //       this.router.navigate(['/student-dashboard']);
//   //     }
//   //   })
//   // ).subscribe({
//   //   next: (response: any) => {
//   //     // Do nothing, since we handle the response in the tap() operator
//   //   },
//   //   error: (error: any) => {
//   //     // Login failed
//   //     this.errorMessage = error.error; // Display the error message in the template
//   //   }
//   // });
  
//   // }
// }
this.loginService.login(email, password).pipe(
  tap((response: any) => {
    // Login successful, set token and role
    const token = response.token;
    const role = response.role;

    this.loginService.setToken(token);
    this.loginService.setRole(role);

    // Store the token in local storage or perform further actions
    console.log('Logged in successfully! Token:', this.loginService.getToken());
    console.log('Role is: ', this.loginService.getRole());

    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/courseview']);
    } else {
      this.router.navigate(['/course']);
    }
  })
).subscribe({
  next: (response: any) => {
    // Do nothing, since we handle the response in the tap() operator
    
  },
  error: (error: any) => {
    // Login failed
    this.errorMessage = error.error; // Display the error message in the template
  }
});
}


}
