import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email:['',[Validators.required,Validators.pattern(this.validatorsService.emailPattern)]],
    username:['',[Validators.required, this.validatorsService.cantBeLafayetes]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required]],
  })

  constructor(private fb:FormBuilder,
    private validatorsService:ValidatorsService){}

    isValidField(field:string){
      this.validatorsService.isValidField(this.myForm,field);
    }

  onSave(){
    this.myForm.markAllAsTouched();
  }
}
