import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/class/course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent {

  
  addcourse: Course = new Course();

  constructor(private courseService: CourseService,private router: Router){}
  
  ngOnInit(): void {
  }
  
 goTocourseview(){
  this.router.navigate(['/courseview']);
 }

  // onSubmit(){
  //   // console.log(this.addcourse);
  //   this.saveCourse();
  // }
  onSubmit(): void {
    this.courseService.addcourses(this.addcourse).subscribe({
      next: (response) => {
        console.log('Course created:', response);
        this.goTocourseview();
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
}
}
