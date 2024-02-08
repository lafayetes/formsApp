import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent {
  // Forma basica de hacer formgroups
  // public myForm:FormGroup = new FormGroup({
  //   name : new FormControl(''),
  //   price : new FormControl(0),
  //   inStorage : new FormControl(0),
  // })


  //Forma recomendade de hacer forms con el formbuilder
  //name:['',[] ,[]] , Esta es la manera donde se coloca en el formbuild, el primero es el valor, el segundo las validaciones sincronas y el tercero las funciones asingronas

  public myForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(3)]],
    price:[0,[Validators.required, Validators.min(0)]],
    inStorage:[0,[Validators.required, Validators.min(0)]],
  })

  onSave(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({price:10,inStorage:0})
    console.log(this.myForm.value);

  }
  constructor(private fb:FormBuilder){}
}
