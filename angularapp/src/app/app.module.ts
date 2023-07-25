import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmissionComponent } from './admission/admission.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CourseComponent } from './course/course.component';
import { CourselistComponent } from './coursemanagement/courselist/courselist.component';
import { AddcourseComponent } from './coursemanagement/addcourse/addcourse.component';
import { UpdatecourseComponent } from './coursemanagement/updatecourse/updatecourse.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseviewComponent } from './coursemanagement/courseview/courseview.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmissionComponent,
    HeaderComponent,
    EnrolledCourseComponent,
    CourseDetailsComponent,
    RegisterFormComponent,
    CourseComponent,
    CourselistComponent,
    AddcourseComponent,
    UpdatecourseComponent,
    NavbarComponent,
    CourseviewComponent,
    StudentListComponent,
    AddStudentComponent,
    UpdateStudentComponent,
    LoginComponent,
    ProfileComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }