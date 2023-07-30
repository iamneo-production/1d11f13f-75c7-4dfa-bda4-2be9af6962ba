import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://8080-bedceacbedadadbcefbeacfaceadeaeaadbdbabf.project.examly.io/api/auth';
  //   private token!: string; // Using non-null assertion operator
  //   private role!: string;
  //   private jwtToken: string | null = null;
  
  
  //   constructor(private http: HttpClient,) {
  //     this.jwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4ifQ.qz-DI1ZC3rGGon5hi2qVst76MdL19AhrZKb6rdai8sM';
  //    }
  
  //    isAuthenticated(): boolean {
  //     return this.jwtToken !== null;
  //   }
  
  //   // Retrieve the user's role from the JWT token and check if it has the required role
  //   hasRequiredRole(requiredRole: string): boolean {
  //     const userRole = this.getUserRoleFromToken();
  
  //     // For demonstration purposes, let's assume the JWT contains the user's role as 'ROLE_USER'
  //     return userRole === requiredRole;
  //   }
  
  //   // In a real-world scenario, you'd decode the JWT to extract the user's role
  //   private getUserRoleFromToken(): string | null {
  //     // For demonstration purposes, let's assume the JWT contains the user's role as 'ROLE_USER'
  //     return 'ROLE_ADMIN';
  //   }
  
  //   login(email: string, password: string): Observable<any> {
  //     const loginForm = { email, password };
  //     return this.http.post(`${this.baseUrl}/login`, loginForm).pipe(
  //       tap((response: any) => {
  //         console.log('Response from backend:', response);
  //         this.setTokenAndRole(response);
  //       })
  //     );
  //   }
  
  
  //   // login(email: string, password: string): Observable<any> {
  //   //   const loginForm = { email, password };
  //   //   return this.http.post(`${this.baseUrl}/login`, loginForm).subscribe(
  //   //     (response: any) => {
  //   //       console.log('Response from backend:', response);
  //   //        this.setTokenAndRole(response);
  //   //     }
  //   //   );
  //   // }
  
  
  //   setTokenAndRole(response: any): void {
  //     // const token = response.token;
  //     // const role = response.role;
  //     console.log('Setting token and role:', response.token, response.role);
  //     this.token = response.token;
  //     this.role = response.role;
  //   }
  
  //   setToken(token: string): void {
  //     this.token = token;
  //     // Optionally, you can store the token in local storage or a cookie for persistence
  //     // localStorage.setItem('token', token);
  //   }
  
  //   getToken(): string {
  //     return this.token;
  //     // Optionally, you can retrieve the token from local storage or a cookie
  //     // return localStorage.getItem('token') || '';
  //   }
  //   setRole(role: string): void {
  //     this.role = role;
  //   }
  
  //   getRole(): string {
  //     return this.role;
  //   }
  
  // }

    private token!: string; // Using non-null assertion operator
    private role!: string;
    private jwtToken: string | null = null;
  
  
    constructor(private http: HttpClient,) {
  
     }
  
     isAuthenticated(): boolean {
      return this.jwtToken !== null;
    }
  
    // Retrieve the user's role from the JWT token and check if it has the required role
    hasRequiredRole(requiredRole: string): boolean {
      const userRole = this.getUserRoleFromToken();
  
      // For demonstration purposes, let's assume the JWT contains the user's role as 'ROLE_USER'
      return userRole === requiredRole;
    }
  
    // In a real-world scenario, you'd decode the JWT to extract the user's role
    private getUserRoleFromToken(): string | null {
      // For demonstration purposes, let's assume the JWT contains the user's role as 'ROLE_USER'
      return 'ROLE_ADMIN';
    }
  
    login(email: string, password: string): Observable<any> {
      const loginForm = { email, password };
      return this.http.post(`${this.baseUrl}/login`, loginForm).pipe(
        tap((response: any) => {
          console.log('Response from backend:', response);
          this.setTokenAndRole(response);
        })
      );
    }
  
    logout(): Observable<any> {
      const logoutUrl = `${this.baseUrl}/logout`; // Replace with your logout API endpoint
  
      // Clear the authentication information from local storage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userRole');
  
      // Make a logout request to the backend
      return this.http.post(logoutUrl, {});
    }
  
  
  
    // login(email: string, password: string): Observable<any> {
    //   const loginForm = { email, password };
    //   return this.http.post(`${this.baseUrl}/login`, loginForm).subscribe(
    //     (response: any) => {
    //       console.log('Response from backend:', response);
    //        this.setTokenAndRole(response);
    //     }
    //   );
    // }
  
  
    // setTokenAndRole(response: any): void {
    //   // const token = response.token;
    //   // const role = response.role;
    //   console.log('Setting token and role:', response.token, response.role);
    //   this.token = response.token;
    //   this.role = response.role;
    // }
    // Update the setTokenAndRole method in LoginService
  
  setTokenAndRole(response: any): void {
    // Set the token, role, and userId from the response
    const { token, role, userId } = response;
    console.log('Setting token, role, and userId:', token, role, userId);
    this.token = token;
    this.role = role;
  
    // Store the token, role, and userId in local storage
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);
  }
  
  
    setToken(token: string): void {
      this.token = token;
      localStorage.setItem('jwtToken', token); 
      // Optionally, you can store the token in local storage or a cookie for persistence
      // localStorage.setItem('token', token);
    }
    getToken(): string {
      if (!this.token) {
        this.token = localStorage.getItem('jwtToken') || ''; // Retrieve the token from localStorage
      }
      return this.token;
    }
  
    setRole(role: string): void {
      this.role = role;
    }
  
    getRole(): string {
      return this.role;
    }
  
    // logout(): Observable<any> {
    //   const logoutUrl = `${this.baseUrl}/api/auth/logout`; // Replace with your logout API endpoint
  
    //   // Clear the authentication information from localStorage or cookies
    //   localStorage.removeItem('access_token');
  
    //   // Make a logout request to the backend
    //   return this.http.post(logoutUrl, {});
    // }
  
    
    // logout(): Observable<any> {
    //   const logoutUrl = `${this.baseUrl}/logout`; // Replace with your logout API endpoint
  
    //   // Clear the authentication information from localStorage or cookies
    //   localStorage.removeItem('access_token');
  
    //   // Make a logout request to the backend
    //   return this.http.post(logoutUrl, {});
    // }
  
    
  
    
    // Rest of the methods...
  }

  

