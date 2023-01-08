import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Route } from "@angular/router";
import { Fichier } from "src/app/model/fichier.model";

import { FichierService } from "src/app/services/fichier.service";


@Component({
  selector: 'app-depots',
  templateUrl: './depots.component.html',
  styleUrls: ['./depots.component.css']
})
export class DepotsComponent  implements OnInit {
  

    fichiers : Array<Fichier> = [];
    
     currentPage : number=1;
     pageSize : number = 5;
     totalPages : number =0 ;
     errorMessage! : String ;
     findFormGroup! : FormGroup ;
     currentAction : string = 'all' ; 
     type : string ="depot";
     domain! : string ;
     user_id : string = "Malek Hellal"  ; 
     file!:any ;
     isStudent : boolean = false ;
     role : String = "";
     etudiant : boolean = false ;  

     
    
    
   
      
      
   
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
      
      
         this.handleGetAllFichiers();
      
      
      
       // this.handleGetAllClasses();
      //this.handleSearchFichiers()
   
        
     }


     constructor(private fichierService : FichierService, private fb : FormBuilder  , router : ActivatedRoute
      , private http : HttpClient  ){
       
       
        this.domain =router.snapshot.params['domain'];
       
        
        console.log(this.domain);
     
      
       }
     
   getUserId (user_id : string){
     this.user_id = user_id ; 
     
     }
     getDomain (domain : string){
      this.domain = domain ; 
      
      }
     
     getFile(event : any){
     this.file = event.target.files[0] ;
     }
     handleGetAllFichiers() {
       this.fichierService.getDepotsFromApi(this.domain).subscribe( {
   
         next : (data) => {
         this.fichiers = data;
          console.log(this.fichiers , this.type);
        
          
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

    file.append("matiere",this.domain);
    file.append("type",this.type);
    file.append("user_id",this.user_id);
    file.append("domain",this.domain);



    
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
   

