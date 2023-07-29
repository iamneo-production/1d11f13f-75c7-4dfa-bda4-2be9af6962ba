import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from 'src/app/service/course.service';
import { Course } from '../class/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {

  courses: Course[] = [];
  searchText: string = '';
  //filteredCourses: Course[] = [];
  showApplicationStatus: boolean = false;
  applicationAccepted: boolean = true;  
  enrolledCourse: Course | null = null;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) {}

  
    get filteredCourses(): Course[] {
      return this.courses.filter(course => course.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }
      onSearch() {
        if (this.searchText.trim() !== '') {
          this.courses = this.courses.filter((ac) =>
            ac.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
        } else {
          this.getAllCourse(); // Reset the course list to show all courses when search input is empty.
        }
      }
      private getAllCourse(){
        this.courseService.getCourseList().subscribe(data=> {
          this.courses = data;
        })
      }
  ngOnInit(): void {
    //this.courses = this.courseService.getAllCourse();
    this.courseService.getAllCourse().subscribe(data => {
      this.courses = data;
    });
    
  }

  enroll(course: Course): void {
    this.enrolledCourse = course;
    this.router.navigate(['/course-details'], { state: { course } });
  }
  enrollcourse(course: Course){
    this.router.navigate(['/admission'])
  }

  checkApplicationStatus(): void {
    this.showApplicationStatus = true;
  }


}
