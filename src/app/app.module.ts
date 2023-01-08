import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClassesComponent } from './Classes_/classes/classes.component';
import { NewClasseComponent } from './Classes_/new-classe/new-classe.component';
import { EditClasseComponent } from './Classes_/edit-classe/edit-classe.component';
import { HttpClientModule } from '@angular/common/http';
import { FichiersComponent } from './Fichiers_/fichiers/fichiers.component';


import { DomainsComponent } from './Domain/domains/domains.component';
import { DepotsComponent } from './Depots/depots/depots.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { AboutComponent } from './About/about/about.component';
import {KeycloakAngularModule , KeycloakService } from 'keycloak-angular';



function intializeKeycloak (keycloak : KeycloakService)
{

  return ( ) =>
  keycloak.init({
    config : {
      url : 'http://localhost:8080/auth',
      realm : 'My Realm',
      clientId : 'angular-client' ,

    },
    initOptions: {
      onLoad : 'login-required',
      flow : 'standard',
    },
  });
}





@NgModule({
  declarations: [
    AppComponent,
    ClassesComponent,
    ClassesComponent,
    NewClasseComponent,
    EditClasseComponent,
    FichiersComponent,
    DomainsComponent,
    DepotsComponent,
    HomepageComponent,
    AboutComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule ,
   
  ],
  providers: [

    {
      provide : APP_INITIALIZER,
      useFactory : intializeKeycloak,
      multi :true ,
      deps : [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
