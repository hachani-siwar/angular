import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Fichier } from 'src/app/model/fichier.model';
import { FichierService } from 'src/app/services/fichier.service';


@Component({
  selector: 'app-fichiers',
  templateUrl: './fichiers.component.html',
  styleUrls: ['./fichiers.component.css']
})
export class FichiersComponent implements OnInit{

 fichiers! : Array<Fichier>;
 
  currentPage : number=1;
  pageSize : number = 5;
  totalPages : number =0 ;
  errorMessage! : String ;
  findFormGroup! : FormGroup ;
  currentAction : string = 'all' ; 
  name : string ="";
  file!:any ;
  type : string = "cours";

  role : String = "" ;
  etudiant : boolean = false ; 
  

 
 
  constructor(private fichierService : FichierService, private fb : FormBuilder 
    ,private router : Router , private http : HttpClient ){
   
   
    }
   
   

  ngOnInit(): void {

 this.role= this.fichierService.getSession();

 if (this.role == "Etudiant")
 {
  this.etudiant = true ; 
 }
 else if (this.role == "Enseignant" )
 {
  this.etudiant =false ; 
 }

    this.findFormGroup=this.fb.group ({
      keyword : this.fb.control (null)
      });
   
   
      this.handleSearchFichiers();
   
   
   
    // this.handleGetAllClasses();
   //this.handleSearchFichiers()

     
  }
  
getName (name : string){
  this.name = name ; 
  
  }
  
  getFile(event : any){
  this.file = event.target.files[0] ;
  }
  handleGetAllFichiers() {
    this.fichierService.getFichiersFromApi(this.type).subscribe( {

      next : (data) => {
        this.fichiers = data
       
      },
      error : (error) => {
        this.errorMessage = error.message ;
      }
     });

   

  }
 


 


  handleDeleteFile(name : string) {

    let conf=confirm ("Are you sure you want to delete this file ?");
    if (conf==false) return ;

    this.fichierService.getDeleteFichierFromApi(name).subscribe(
      {
        
      }
    );
   
    this.router.navigateByUrl("/files");
    }
    handleSearchFichiers() {
      
     
  
      this.currentAction ="search";
     
      let keyword = this.findFormGroup.value.keyword ;
     this.handleGetAllFichiers();
     this.fichiers= this.fichierService.searchFile(keyword , this.fichiers)
     console.log(this.fichiers);
     
    }

    handleNewFichier() {
     
 let file = new FormData();
 //file.set("file",this.file);
 file.append("file",this.file)
 file.append("matiere",this.name);

 file.append("type","cours");
 file.append("domain",this.name);
 file.append("user_id","");
 
 
 this.http.post("http://localhost:8077/uploadFile",file).subscribe(
  {  next : (data) => {
  
   
  },
  error : (error) => {
    this.errorMessage = error.message ;
    console.log(error.message);
  }
 });

 console.log("http://localhost:8077/uploadFile/",file.get('file'));

   


    }

    handleDownloadfile(file_name : string)
    {
      this.fichierService.downloadFileFromApi(file_name).subscribe( {

        next : (data) => {
          console.log("hello")
         
        },
        error : (error) => {
          this.errorMessage = error.message ;
        }
       });
  

    }

  

}
