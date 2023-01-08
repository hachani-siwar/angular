import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Domain } from 'src/app/model/fichier.model';



import { DomainsService } from 'src/app/services/domains.service';




@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {
 domains! : Array<Domain>;

 errorMessage! : String ;
 classeGrade! : String ;;



  ngOnInit(): void {
    
    this.handleGetAllDomains();
  }


  constructor(private domainService : DomainsService, private fb : FormBuilder 
    ,private router : ActivatedRoute , private http : HttpClient , rt : Router  ){
      this.classeGrade = this.router.snapshot.params['classeGrade'];
      console.log(this.classeGrade);
   
    }



handleGetAllDomains(){
  this.domainService.getDomainsFromApi(this.classeGrade).subscribe( {

    next : (data) => {
      this.domains = data
     
    },
    error : (error) => {
      this.errorMessage = error.message ;
    }
   });

}



}
