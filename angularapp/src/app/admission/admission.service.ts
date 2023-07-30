import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Admission } from '../class/admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private apiUrl = 'https://8080-bdfdeabfecfbcefbeacfaceadeaeaadbdbabf.project.examly.io';

  constructor(private http: HttpClient) {}

  fetchCourses() {
    const apiUrl = `${this.apiUrl}/courses`;
    return this.http.get<any[]>(apiUrl);
  }

  isFileSizeExceeded(file: File, maxSizeInBytes: number): boolean {
    return file.size > maxSizeInBytes;
  }

  submitAdmissionForm(formData: FormData) {
    return this.http.post(`${this.apiUrl}/admission`, formData);
  }
  getAllAdmissions(): Observable<Admission[]>{
    return this.http.get<Admission[]>(`${this.apiUrl}/getall`);
  }

  getAdmissionById(id: number): Observable<Admission>{
    return this.http.get<Admission>(`${this.apiUrl}/get/${id}`);
  }
}
