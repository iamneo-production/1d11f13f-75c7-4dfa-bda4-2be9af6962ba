import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { AdmissionComponent } from './admission/admission.component';


const routes: Routes = [
  {
    path:'course',
    component: CourseComponent
  },
  {
    path:'admission',
    component:AdmissionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
