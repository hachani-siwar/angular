import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-classe',
  templateUrl: './new-classe.component.html',
  styleUrls: ['./new-classe.component.css']
})
export class NewClasseComponent implements OnInit {

 classeFormGroup! : FormGroup ;
 
 

 constructor (private fb : FormBuilder ,public classeService : ClasseService)
 {
  
 }


  ngOnInit(): void {
    
this.classeFormGroup = this.fb.group ({
  name : this.fb.control (null , [Validators.required,Validators.minLength(4)])
 , 
 classeGrade : this.fb.control (null , [Validators.required,Validators.minLength(2)])
 ,
});

  }

  handleAddClasse(){


 let classe = this.classeFormGroup.value;
 
 this.classeService.getAddClasseFromApi(classe).subscribe({
  next : (data) =>{
      alert("class added ! ");
      this.classeFormGroup.reset();
      
  }, 
  error : err => {

    console.log(err.error.message);


  }

 });
  }









}
