import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Domain } from '../model/fichier.model';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

  constructor(private http : HttpClient) { }


  getDomainsFromApi( classeGrade : String):Observable<Domain[]>{ 

    return this.http.get<Domain[]>("http://127.0.0.1:8077/getDomains/"+ classeGrade); 
  
  } 

}
