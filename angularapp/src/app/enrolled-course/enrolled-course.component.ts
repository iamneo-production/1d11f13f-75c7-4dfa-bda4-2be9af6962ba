import { Component } from '@angular/core';
import { CourseService } from './course.service';



interface Course {
  name: string;
  description: string;
  duration: string;
}
@Component({
  selector: 'app-enrolled-course',
  templateUrl: './enrolled-course.component.html',
  styleUrls: ['./enrolled-course.component.css'],
  providers: [CourseService]
})
export class EnrolledCourseComponent {
  enrolledCourses: Course[] = [];
  deletedCourses: Course[] = [];
  searchTerm: string = '';
  constructor(private courseService: CourseService) {
    this.enrolledCourses = this.courseService.getEnrolledCourses();
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
  get filteredCourses(): Course[] {
    if (this.searchTerm.trim() === '') {
      return this.enrolledCourses;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.enrolledCourses.filter(course =>
        course.name.toLowerCase().includes(searchTermLower)
      );
    }
  }
}
