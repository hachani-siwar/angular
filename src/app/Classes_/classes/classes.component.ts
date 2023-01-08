import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FichierService } from 'src/app/services/fichier.service';
import { Classe } from '../../model/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {


 
 classes! : Array<Classe>;
 currentPage : number=1;
 pageSize : number = 5;
 totalPages : number =0 ;
 errorMessage! : String ;
 searchFormGroup! : FormGroup ;
 currentAction : string = 'all' ; 
 role : String = "" ;
  etudiant : boolean = false ; 





 constructor(private classeService : ClasseService, private fb : FormBuilder 
 ,private router : Router , private fichierService : FichierService  ){


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
    
    this.searchFormGroup=this.fb.group ({
    keyword : this.fb.control (null)
    });
   this.handleGetPageClasses();
  //this.handleGetAllClasses();
  
   
  }

  handleGetAllClasses() {
    this.classeService.getClassesFromApi().subscribe( {

      next : (data) => {
        this.classes = data
       
      },
      error : (error) => {
        this.errorMessage = error.message ;
      }
     });

   

  }


  handleGetPageClasses() {
    this.classeService.getPageClassesFromApi(this.currentPage, this.pageSize).subscribe( {

      next : (data) => {
        this.classes = data.docs ;
        this.totalPages = data.pages ; 
        console.log(data);
       
      },
      error : (error) => {
        this.errorMessage = error.message ;
      }
     });
  }

  gotoPage (i : number) {

   this.currentPage = i ;
   

   if (this.currentAction==='all')

 {this.handleGetPageClasses();}

   else

   {
   this.handleSearchClasses();
  }
  }





  handleDeleteClasse(c: Classe) {

    let conf=confirm ("Are you sure you want to delete this class ?");
    if (conf==false) return ;

    this.classeService.getDeleteClasseFromApi(c._id).subscribe(
      {
        
      }
    );
    this.handleGetPageClasses();
    
    }
    handleSearchClasses(){
      this.currentAction ="search";
     
      let keyword = this.searchFormGroup.value.keyword ;
      
      this.classeService.getSearchPageClassesFromApi(keyword , this.currentPage , this.pageSize).subscribe(
        {
          next : (data) => {
            this.classes = data.docs ;
            this.totalPages=data.pages ;
            console.log(this.classes);
           
          }
        }
      )
    }

    handleNewClasse() {

      this.router.navigateByUrl("/newClasse");


    }

    handleEditClasse (c : Classe){
      this.router.navigateByUrl("/editClasse/"+c._id);
      console.log(c._id);
    }


    handleGoToDomain (classeGrade : String)
    {
      this.router.navigateByUrl("/domains/"+classeGrade);
      console.log(classeGrade);
    }
    





}
