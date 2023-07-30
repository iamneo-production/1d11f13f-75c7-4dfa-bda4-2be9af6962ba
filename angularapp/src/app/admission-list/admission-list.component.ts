import { Component, OnInit } from '@angular/core';
import { Admission } from '../class/admission';
import { AdmissionService } from '../admission/admission.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.css']
})
export class AdmissionListComponent implements OnInit{
  admissions: Admission[] = [];

  isAcceptButtonDisabled: { [id: number]: boolean } = {};
  isRejectButtonDisabled: { [id: number]: boolean } = {};

  constructor(private admissionService: AdmissionService,
    private router: Router,private http: HttpClient) { }


  ngOnInit(): void {
    this.getAdmissions();
  }

  private getAdmissions(){
    this.admissionService.getAllAdmissions().subscribe(data => {
      this.admissions = data;
      
    });
  }

  admissionDetails(id:number){
    this.router.navigate(['/admission-details', id]);
  }


  reject(id: number): void {
    const url = `https://8080-dedafedcfdcefbeacfaceadbffaabaebdcec.project.examly.io/acceptRejectApplication/${id}`;
    const statusUpdate = { status: 'rejected' };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    this.http.put(url, statusUpdate, httpOptions).subscribe(
      () => {
        // This block will be executed after the response is received
        this.getAdmissions(); // Refresh the document after status update
        
      },
      (error) => {
        console.error('Error while rejecting application:', error);
        // Handle the error here or show an error message to the user
      }
    );
    alert('Application is Rejected!!!');
        this.isAcceptButtonDisabled[id] = true;
        this.isRejectButtonDisabled[id] = false;
    
}

accept(id: number): void {
  const url = `https://8080-dedafedcfdcefbeacfaceadbffaabaebdcec.project.examly.io/acceptRejectApplication/${id}`;
  const statusUpdate = { status: 'accepted' };

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  this.http.put(url, statusUpdate, httpOptions).subscribe(
    () => {
      // This block will be executed after the response is received
      this.getAdmissions(); // Refresh the document after status update
      
    },
    (error) => {
      console.error('Error while rejecting application:', error);
      // Handle the error here or show an error message to the user
    }
  );
  alert('Application is Accepted Successfully!!!');
      this.isAcceptButtonDisabled[id] = false;
      this.isRejectButtonDisabled[id] = true;
  
}

}
