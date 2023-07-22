import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  fetchCourses() {
    const apiUrl = `${this.apiUrl}/getAllCourses`;
    return this.http.get<any[]>(apiUrl);
  }

  isFileSizeExceeded(file: File, maxSizeInBytes: number): boolean {
    return file.size > maxSizeInBytes;
  }

  submitAdmissionForm(formData: FormData) {
    return this.http.post(`${this.apiUrl}/students/store`, formData);
  }
}
