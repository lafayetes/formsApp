import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    //email:['',[Validators.required,Validators.pattern(this.validatorsService.emailPattern)],[new EmailValidator()]],
    email:['',[Validators.required,Validators.pattern(this.validatorsService.emailPattern)],[this.emailValidator]],
    username:['',[Validators.required, this.validatorsService.cantBeLafayetes]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required]],
  }
  //Aqui es donde se coloca luego del fb.group las validaciones que implicitamente obtienen todo el formgroup
  ,{
    validators:[
      // En este servicio se envia los nombres de los formControls que en este caso son password y password2
      this.validatorsService.isFieldOneEqualFieldTwo('password','password2')
    ]
  }
  )

  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorsService,
    private emailValidator:EmailValidator){}

    isValidField(field:string) :boolean | null{
      return this.validatorsService.isValidField(this.myForm,field);
    }

  onSave(){
    this.myForm.markAllAsTouched();
  }
}
