import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../class/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student:Student=new Student();
  constructor(private studentService:StudentService, 
    private router: Router){}
  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.student);
    this.savestudent();
    alert(" Student added successfully!");
  }
  savestudent(){
    this.studentService.createStudent(this.student).subscribe( data =>{
      console.log(data);
      this.goToStudentList();
    },
    error => console.log(error));
  }
  goToStudentList(){
    this.router.navigate(['/students']);
  }

}
