import { Component, OnInit } from '@angular/core';
import { Admission } from '../class/admission';
import { ActivatedRoute } from '@angular/router';
import { AdmissionService } from '../admission/admission.service';



@Component({
  selector: 'app-admission-details',
  templateUrl: './admission-details.component.html',
  styleUrls: ['./admission-details.component.css']
})
export class AdmissionDetailsComponent implements OnInit {
  id:any;
  admission: Admission = new Admission;

  constructor(private route: ActivatedRoute, private admissionsService: AdmissionService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.admission = new Admission();
    this.admissionsService.getAdmissionById(this.id).subscribe( data => {
      this.admission = data;
    });
  }

  


}
