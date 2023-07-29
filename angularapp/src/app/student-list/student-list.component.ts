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
  
  getfilteredStudents(): Student[] {
    return this.students.filter(student => {
      const searchTextLower = this.searchText.toLowerCase();
      return (
        student.firstName.toLowerCase().includes(searchTextLower) ||
        student.lastName.toLowerCase().includes(searchTextLower) ||
        student.email.toLowerCase().includes(searchTextLower) ||
        student.password.toLowerCase().includes(searchTextLower) ||
        student.address.toLowerCase().includes(searchTextLower) ||
        student.phoneNumber.toLowerCase().includes(searchTextLower) ||
        student.id.toString().includes(searchTextLower)
      );
    });
  }
  
  
  onSearch() {
    if (this.searchText.trim() !== '') {
      this.students = this.getfilteredStudents();
    } else {
      this.getAllStudents();
    }
  }
  
  private getAllStudents() {
    this.studentService.getstudentslist().subscribe(data => {
      this.students = data;
    });
  }
  

}
