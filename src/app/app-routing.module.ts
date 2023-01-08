import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './Classes_/classes/classes.component';
import { EditClasseComponent } from './Classes_/edit-classe/edit-classe.component';
import { NewClasseComponent } from './Classes_/new-classe/new-classe.component';
import { HttpClientModule } from '@angular/common/http';
import { FichiersComponent } from './Fichiers_/fichiers/fichiers.component';
import { DomainsComponent } from './Domain/domains/domains.component';
import { DepotsComponent } from './Depots/depots/depots.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { AboutComponent } from './About/about/about.component';
const routes: Routes = [

{path : "classes" , component : ClassesComponent},
{path : "newClasse" , component : NewClasseComponent},
{path : "editClasse/:id" , component : EditClasseComponent},
{path : "files" , component : FichiersComponent},
{path : "domains/:classeGrade" , component : DomainsComponent},
{path : "depots/:domain" , component : DepotsComponent},
{path : "" , component : HomepageComponent},
{path : "about" , component : AboutComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    

  
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
