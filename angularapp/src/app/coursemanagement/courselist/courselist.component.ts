import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/class/course';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent {

  course: Course[]=[];
  searchText:String='';



  constructor(private courseService : CourseService,
    private router:Router){ }

    updateCourse(id:any){
      this.router.navigate(['updatecourse/:id',id]);
    }
  ngOnInit(): void {
    this.getCourse();
  }
  private getCourse(){
    this.courseService.getCourseList().subscribe(data=> {
      this.course = data;
    })
  }

    // deleteCourse(id:number){
    //   this.courseService.deleteCourse(id).subscribe(data=> {
    //     console.log(data);
    //     this.getCourse();
    //   })
    // }

    viewCourse(id:number){
      this.router.navigate(['/viewcourse',id])
    }

    get filteredCourses(): Course[] {
      return this.course.filter(course => course.name.toLowerCase().includes(this.searchText.toLowerCase()));
      }
      onSearch() {
        if (this.searchText.trim() !== '') {
          this.course = this.course.filter((ac) =>
            ac.name.toLowerCase().includes(this.searchText.toLowerCase())
          );
        } else {
          this.getCourse(); // Reset the course list to show all courses when search input is empty.
        }
      }
}
