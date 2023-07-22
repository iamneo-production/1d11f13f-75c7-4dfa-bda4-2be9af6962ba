import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { RouterModule} from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HttpClientModule } from '@angular/common/http';
=======
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmissionComponent } from './admission/admission.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { EnrolledCourseComponent } from './enrolled-course/enrolled-course.component';
>>>>>>> 3c1fdedaa01598ce26c117916c4d433efa8ca571

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    RegisterFormComponent,
  
=======
    AdmissionComponent,
    HeaderComponent,
    EnrolledCourseComponent,
>>>>>>> 3c1fdedaa01598ce26c117916c4d433efa8ca571
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule.forRoot([]),
=======
>>>>>>> 3c1fdedaa01598ce26c117916c4d433efa8ca571
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
