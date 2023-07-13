import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmissionComponent } from './admission/admission.component';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    AdmissionComponent
=======
    HeaderComponent
>>>>>>> 86eb8bcfd11af761e1d7eebfd860407abc405219
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
