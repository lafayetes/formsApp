import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

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

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }
  getFieldError(field: string): string | null {

    return this.validatorsService.getFieldError(this.myForm, field);

  }
  // getFieldError(field:string){
  //   return this.validatorsService.getFieldError(this.myForm,field);


  // }


  onSave() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({ price: 10, inStorage: 0 })
    console.log(this.myForm.value);

  }
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) { }
}
