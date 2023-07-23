import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course }from '../class/course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl: string;

  constructor(private http: HttpClient) { 
   this.courseUrl = 'https://8080-dedafedcfdcefbeacfaceadeaeaadbdbabf.project.examly.io/courses';
  }
  public getAllCourse(): Observable<Course[]> {
   return this.http.get<Course[]>(this.courseUrl);
 }
 
}
