import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/class/course';
import { CourseService } from 'src/app/service/course.service';
@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css']
})
export class UpdatecourseComponent {

  addcourse: Course = new Course();
  Id: any;

  constructor(
    private courseService: CourseService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.router.snapshot.params['id'];
    this.Id = courseId; // Assigning value to Id
    this.courseService.getCourseById(courseId).subscribe((data) => {
      this.addcourse = data;
    });
  }

  onSubmit() {
    this.courseService.updateCourse(this.Id, this.addcourse).subscribe(
      (data) => {
        this.goTocourseview();
      },
      (error) => console.log(error)
    );
  }

  goTocourseview() {
    this.route.navigate(['/courseview']);
  }
}
