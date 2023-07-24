import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AdmissionComponent } from './admission/admission.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';


const routes: Routes = [
  {
    path:'course',
    component: CourseComponent
  },
  {
    path:'admission',
    component:AdmissionComponent
  },
  {
  path:'enrolled-course',
  component:EnrolledCourseComponent
  },
  {path:'students',component:StudentListComponent},
  {path:'add-student',component:AddStudentComponent},
  {path:'update-student/:id',component:UpdateStudentComponent},
  {path:'student-details/:id',component:StudentDetailsComponent},
  {path:'',redirectTo:'students',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
