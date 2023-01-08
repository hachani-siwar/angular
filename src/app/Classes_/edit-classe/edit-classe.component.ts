import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Classe } from '../../model/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.css']
})
export class EditClasseComponent implements OnInit {
  classeId! : string ;
  classe! : Classe;
  classeFormGroup! : FormGroup ;
  
  
   constructor(private route : ActivatedRoute , public classeService : ClasseService
    , private fb : FormBuilder,){
   this.classeId = this.route.snapshot.params['id'];
   console.log(this.classeId);

   }

  ngOnInit(): void {
   
this.classeService.getClasseByIdFromApi(this.classeId).subscribe({
 
  next : (classe) => {
    this.classe = classe ;
   // console.log(classe.name);
     
this.classeFormGroup = this.fb.group ({
  name : this.fb.control (this.classe.name , [Validators.required,Validators.minLength(4)])
 , 
 classeGrade : this.fb.control (this.classe.classeGrade , [Validators.required,Validators.minLength(4)])
 ,
});

  },
  error : (err)=> {
    console.log(err);
  }

}
 
);
console.log(this.classeFormGroup.value);
}

handleUpdateClasse()
{let c = this.classeFormGroup.value ;
 
  c._id = this.classe._id ;
  console.log(c);
  this.classeService.getUpdateClasseFromApi(c._id,c).subscribe({

next : (classe) =>
{
  alert ("classe updated ! ")
  
},
error : err =>{
  console.log(err);
}

  });
 
}

}
