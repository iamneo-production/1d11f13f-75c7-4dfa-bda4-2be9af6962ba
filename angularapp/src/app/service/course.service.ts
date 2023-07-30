import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course }from '../class/course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl: string= 'https://8080-dedafedcfdcefbeacfaceadeaeaadbdbabf.project.examly.io/courses';

  constructor(private http: HttpClient) { 

  }
  public getAllCourse(): Observable<Course[]> {
   return this.http.get<Course[]>(this.apiUrl);
 }
 
 getCourseList():Observable<Course[]>{
  return this.http.get<Course[]>(`${this.apiUrl}`);
}

 addcourses(course: Course):Observable<any>{
  return this.http.post<any>(`${this.apiUrl}`,course);
}

getCourseById(Id:number):Observable<Course>{
  return this.http.get<Course>(`${this.apiUrl}/${Id}`);
}

updateCourse(Id: number, course:Course):Observable<Object>{
  return this.http.put(`${this.apiUrl}/${Id}`,course);
}

deleteCourse(Id:number):Observable<Object>{
  return this.http.delete(`${this.apiUrl}/${Id}`);
}
 
}