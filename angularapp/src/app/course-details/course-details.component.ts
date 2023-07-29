import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../class/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course | any;

  constructor (private router: Router) { }

  ngOnInit(): void {
    this.course = history.state.course;
    if (!this.course) {
      this.router.navigate(['/course']);
    }
  }

  
  enroll(): void {
    
    this.router.navigate(['/enrollment']);
  }

}
