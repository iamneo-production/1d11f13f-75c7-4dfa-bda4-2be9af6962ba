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
  {
    component:CourselistComponent,
    path:"courseview"
  },
  {
    component:AddcourseComponent,
    path:"addcourse"
  },
  {
    component:UpdatecourseComponent,
    path:"updatecourse/:id"
  },
  {
    component:CourseviewComponent,
    path:"viewcourse/:id"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
