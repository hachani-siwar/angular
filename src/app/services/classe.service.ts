import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
  
  


































}
