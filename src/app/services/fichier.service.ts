import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Fichier, PageFichier } from '../model/fichier.model';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  role! : String ; 
  name ! : String ; 
  constructor( private http : HttpClient) {

   

  }




 setSession (role : String)
 {
 this.role = role ; 

 }

getSession () : String
{
  return this.role ; 

}

setName (name: String)
 {
 this.name = name ; 

 }

getName () : String
{
  return this.name ; 

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
  
  
  
  
  
  getFichiersFromApi(type : string):Observable<Fichier[]>{ 

      return this.http.get<Fichier[]>("http://127.0.0.1:8077/getFiles/"+ type); 
    
    } 


 
    getDepotsFromApi(domain : string):Observable<Fichier[]>{ 

      return this.http.get<Fichier[]>("http://127.0.0.1:8077/getFileByDomain/"+ domain ); 
    
    } 

  
  getPageFichiersFromApi(page : number , size : number):Observable<PageFichier>{   

    
    return this.http.get<PageFichier>("http://127.0.0.1:8085/pclasses/?"+ "page=" +page +"&size=" + size); 


      } 
  
    getSearchPageFichierFromApi(kw : string , page : number , size : number):Observable<PageFichier>{ 

       
        return this.http.get<PageFichier>("http://127.0.0.1:8085/classes-search/?"+"kw="+kw+ "&page=" +page +"&size=" + size); 

      } 
  
    
    getFileByIdFromApi(id : string) : Observable<Fichier>{  

            
            
            return this.http.get<Fichier>("http://127.0.0.1:8085/classes/"+id); 
          
          
      }      
         
  
  
  
  
    getDeleteFichierFromApi(name : string){ 

           
            alert('classe deleted');
            return this.http.delete("http://127.0.0.1:8077/files/"+ name);  
          
          
      }      
         
  
   
           
              
   getAddFichierFromApi(data : Fichier){  

              
          
              return this.http.post("http://127.0.0.1:8085/classes/",data); 
            
            
            } 
            
            downloadFileFromApi(file_name : string){  

              
          console.log("http://127.0.0.1:8077/downloadFile/"+file_name);
              return this.http.get("http://127.0.0.1:8077/downloadFile/"+file_name); 
            
            
            }
            



           
 public searchFile(keyword : string ,  fichiers :Fichier[] ) : Array<Fichier>
{  
  let result = fichiers.filter(f => f.file_matiere.includes(keyword));

  
  
   return result ; 
}
  
  
}
