import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/class/course';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css']
})
export class CourseviewComponent implements OnInit{

  
  id: number =0
  course: Course = new Course;
  courses: Course[]=[];

  constructor(private router: ActivatedRoute,private courseService:CourseService,
    private route:Router){}
 
 
  ngOnInit(): void {
     this.id = this.router.snapshot.params['id'];
     this.course=new Course();
     this.courseService.getCourseById(this.id).subscribe(data=>{
      this.course=data;
     })

  }
  private getCourse(){
    this.courseService.getCourseList().subscribe(data=> {
      this.courses = data;
    })
  }
  updateCourse(id:any){
    this.route.navigate(['updatecourse',id]);
  }
  
  deleteCourse(id:number){
    this.courseService.deleteCourse(id).subscribe(data=> {
      console.log(data);
      this.getCourse();
      this.route.navigate(['/courseview']);
    })
  }
}
