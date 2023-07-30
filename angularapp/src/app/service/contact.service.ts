import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  postContactform(formData: any) {
    return this.http.post("https://8080-dedafedcfdcefbeacfaceadeaeaadbdbabf.project.examly.io/api/students", formData);
}
}