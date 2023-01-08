import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Classe, PageClasse } from '../model/classe.model';
 

@Injectable({
  providedIn: 'root'
})
export class ClasseService {


private classes! : Array<Classe>;




  constructor( private http : HttpClient) {

   

   }






   getErrorMessage (filedName : string , errors : ValidationErrors) {

    if(errors['required']){
      return filedName + " is required !";
    }
    else if(errors['minlength'])
    {
     return   "at least " +errors['minlength']['requiredLength'] + " characters are required !";
    }
    else return " ";
    
      }
  
  
  
  
  
  getClassesFromApi():Observable<Classe[]>{ 

      return this.http.get<Classe[]>("http://127.0.0.1:8085/classes"); 
    
    } 
  
  getPageClassesFromApi(page : number , size : number):Observable<PageClasse>{   

    
    return this.http.get<PageClasse>("http://127.0.0.1:8085/pclasses/?"+ "page=" +page +"&size=" + size); 


      } 
  
    getSearchPageClassesFromApi(kw : string , page : number , size : number):Observable<PageClasse>{ 

       
        return this.http.get<PageClasse>("http://127.0.0.1:8085/classes-search/?"+"kw="+kw+ "&page=" +page +"&size=" + size); 

      } 
  
    
    getClasseByIdFromApi(id : string) : Observable<Classe>{  

            
            
            return this.http.get<Classe>("http://127.0.0.1:8085/classes/"+id); 
          
          
      }      
         
  
  
  
  
    getDeleteClasseFromApi(id : string){ 

           
            alert('classe deleted');
            return this.http.delete("http://127.0.0.1:8085/classes/"+id);  
          
          
      }      
         
  
     getUpdateClasseFromApi(id : string , data : Classe){  


             
             // alert('classe updated');
              return this.http.put("http://127.0.0.1:8085/classes/"+id,data); 
            
      }      
           
              
   getAddClasseFromApi(data : Classe){  

              
          
              return this.http.post("http://127.0.0.1:8085/classes/",data); 
            
            
            }  
  
  


































//Test : 





/*

 this.classes = [

      {_id:UUID.UUID() , name : "Informatique" , classeGrade:"TI"},
      {_id:UUID.UUID() , name : "Informatique" , classeGrade:"DSI2"},
      {_id:UUID.UUID() , name : "Informatique" , classeGrade:"DSI3"},
      {_id:UUID.UUID() , name : "Gestion" , classeGrade:"Gs"},
    
     ];

     for (let i = 0 ; i<10 ; i++)
     {
      this.classes.push( {_id:UUID.UUID() , name : "Genie Procedes" , classeGrade:"GP2"});
      this.classes.push( {_id:UUID.UUID() , name : "Gestion" , classeGrade:"Commerce"});
      this.classes.push( {_id:UUID.UUID() , name : "Electrique" , classeGrade:"Al"});
      
     }

public getAllClasses()  : Observable<Array<Classe>>
{
  
  return of(this.classes);

}
public getPageClasses(page : number , size : number)  : Observable<PageClasse>
{
  let index = page*size ;
 let totalPages = ~~(this.classes.length/size); 
 if(this.classes.length % size != 0)
 {
  totalPages++;
 }
 let pageClasses = this.classes.slice(index , index+size);
 return of( {page:page , size:size ,totalPages:totalPages , classes : pageClasses});
}


public deleteClasse(id : string) :Observable<boolean> {

this.classes =   this.classes.filter(c => c._id != id);
return of(true);

}

public searchClasse(keyword : string , page : number , size : number) : Observable<PageClasse>

{  
  let result = this.classes.filter(c => c.name.includes(keyword));
  
  let index = page*size ;
  let totalPages = ~~(result.length/size); 
  if(result.length % size != 0)
  {
   totalPages++;
  }

  let pageClasses = result.slice(index , index+size)

 
  return of( {page:page , size:size ,totalPages:totalPages , classes : pageClasses});

}

public addNewClasse(classe : Classe) :  Observable<Classe>
{
  classe._id =UUID.UUID();
  this.classes.push(classe);
  return of (classe);
}

public getClasse (id : string) : Observable<Classe>
{
let classe  =  this.classes.find(c => c._id == id);
if(classe == undefined) return throwError(()=> new Error('Classe not found !'));
return of(classe);

}
public updateClasse(classe : Classe) : Observable<Classe>
{
  this.classes = this.classes.map(c=>(c._id==classe._id)?classe:c);
  return of(classe)
;}
*/

}
