import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import { Student } from '../class/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  students: Student[] = [];
  searchText: any;

  constructor(private studentService: StudentService,
    private router: Router) { }
  ngOnInit(): void {
    this.getstudents();
  }
  private getstudents() {
    this.studentService.getstudentslist().subscribe(data => {
      this.students = data;
    });
  }
  studentDetails(id: number) {
    this.router.navigate(['student-details', id]);
  }
  updateStudent(id: number) {
    this.router.navigate(['update-student', id]);
  }
  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(data => {
      console.log(data);
      this.getstudents();
      alert(" Student deleted successfully!");
    })
  }
  
  get filteredCourses(): Student[] {
    return this.students.filter(students => students.firstName.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    onSearch() {
      if (this.searchText.trim() !== '') {
        this.students = this.students.filter((ac) =>
          ac.firstName.toLowerCase().includes(this.searchText.toLowerCase())
        );
      } else {
        this.getAllCourse(); // Reset the course list to show all courses when search input is empty.
      }
    }
    private getAllCourse(){
      this.studentService.getstudentslist().subscribe(data=> {
        this.students = data;
      })
    }


}
