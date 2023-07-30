import { Component } from '@angular/core';
import { Student } from '../class/student';
import { StudentService } from '../service/student.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent {
  id: number=0;
  student: Student = new Student();
  constructor(private studentservice: StudentService,
    private route: ActivatedRoute,
    private router:Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentservice.getStudentById(this.id).subscribe(data => {
      this.student = data;
    }, error => console.log(error));
  }
  onSubmit(){
    this.studentservice.updateStudent(this.id, this.student).subscribe( data =>{
      this.goToStudentList();
      alert(" Details updated successfully!");
    }
    , error => console.log(error));
  }
  goToStudentList(){
    this.router.navigate(['/students']);
  }

}
