import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AdmissionComponent } from './admission/admission.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';


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
  {
    path:'course-details',
    component: CourseDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
