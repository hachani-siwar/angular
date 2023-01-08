import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { FichierService } from './services/fichier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  
]
})
export class AppComponent implements OnInit {
  title = 'Smart University';
  public isLogued = false ; 
  public userProfile : KeycloakProfile | null = null ;
  public ifNotStudent : boolean = false ; 
  public role : string ="";
  public user! : Map<string,any >;
  service! : FichierService ;



constructor (private readonly keycloak : KeycloakService , public srv : FichierService  ){
  
}

 public async ngOnInit() {
   this.isLogued = await this.keycloak.isLoggedIn();

   type rolesUser = Array <{id : number , text : string}>;

   if(this.isLogued)
   {
    this.userProfile = await this.keycloak.loadUserProfile();
   

   if (this.keycloak.isUserInRole("ENSEIGNANT"))
   { this.role = "Enseignat";
   this.ifNotStudent =  true ; }
   else if (this.keycloak.isUserInRole("ENSEIGNANT-ADMIN"))
   {
    this.role = " Enseignant / Admin";
    this.ifNotStudent =  true ; 
   }
   else if (this.keycloak.isUserInRole("USER"))
   { this.role = "Etudiant";
   this.ifNotStudent =  false ; }
  
   this.srv.setSession(this.role);
   console.log (this.role);
   }

   this.user.set("isStudent", this.ifNotStudent
   );
   this.user.set("user", this.userProfile
   );

  

  }

  public initializeSession()
  {
    this.keycloak.login();
  }

  public finSession()
  {
    this.keycloak.logout();
  
  }
 
}
