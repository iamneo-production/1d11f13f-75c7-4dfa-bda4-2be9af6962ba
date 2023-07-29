import { Component } from '@angular/core';
import { Student } from '../class/student';
import { StudentService } from '../service/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  id: number = 0;
  

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.student = new Student();
    this.studentService.getStudentById(this.id).subscribe(
      (data: Student) => {
        this.student = data;
      },
      (error: any) => {
        console.log('An error occurred while fetching student details:', error);
      }
    );
  }

}
