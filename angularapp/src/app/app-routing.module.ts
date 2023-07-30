import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AdmissionComponent } from './admission/admission.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourselistComponent } from './coursemanagement/courselist/courselist.component';
import { AddcourseComponent } from './coursemanagement/addcourse/addcourse.component';
import { UpdatecourseComponent } from './coursemanagement/updatecourse/updatecourse.component';
import { CourseviewComponent } from './coursemanagement/courseview/courseview.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { AdmissionDetailsComponent } from './admission-details/admission-details.component';
import { Admission } from './class/admission';
import { AdmissionListComponent } from './admission-list/admission-list.component';
// import { ResetpasswordComponent } from './resetpassword/resetpassword.component';




const routes: Routes = [
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'admission',
    component: AdmissionComponent
  },
  {
    path: 'enrolled-course',
    component: EnrolledCourseComponent
  },
  {
    path: 'course-details',
    component: CourseDetailsComponent
  },
  {
    component: CourselistComponent,
    path: "courseview"
  },
  {
    component: AddcourseComponent,
    path: "addcourse"
  },
  {
    component:AdmissionDetailsComponent,
    path: "admission-details/:id"
  },
  {
    component: AdmissionListComponent,
    path: "admission-list"
  },
  {
    component: UpdatecourseComponent,
    path: "updatecourse/:id"
  },
  {
    component: CourseviewComponent,
    path: "viewcourse/:id"
  },
  {
    component: RegisterFormComponent,
    path: "registerform"
  },
  {
    component:ProfileComponent,
    path:'profile'
  },
  {
    component:ContactComponent,
    path:'contact'
  },
  { path: 'students', component: StudentListComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'update-student/:id', component: UpdateStudentComponent },
  { path: 'student-details/:id', component: StudentDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-form', component: RegisterFormComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
