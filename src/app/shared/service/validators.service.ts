import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
   firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
   emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

   cantBeLafayetes = (control:FormControl) =>{

    const value:string = control.value.trim().toLowerCase();

    if(value === 'lafayetes'){
      return {
        noLafayetes:true
      }
    }
    return null;
  }

  isValidField(form:FormGroup,field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  isValidArrayField(formArray: FormArray,i:number): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  getFieldError(form:FormGroup,field: string): string | null {

    if (!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};
    console.log(errors);

    for (const key of Object.keys(errors)) {
      console.log(key);

      switch (key) {
        case 'required':

          return 'Este campo es requerido'
        case 'minlength':
          return `Este campo debe ser de almenos ${errors['minlength'].requiredLength} letras`
        case 'min':
          return `El campo debe de ser 0 o mayor`



        default:
          return null;
      }
    }
    return null;

  }


  public isFieldOneEqualFieldTwo(field1:string, field2:string){
    //Aqui esta validacion devuelve el formgroup por lo que esta validacion se coloca luego del fb.group({})
    return(formGroup:AbstractControl):ValidationErrors|null =>{

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        // En esta parte basicamente se asigna en el input que se colocara el error.
        formGroup.get(field2)?.setErrors({notEqual:true});
        return {notEqual:true}
      }
      // Aqui va el codigo en caso de que se cumpla la validacion

      formGroup.get(field2)?.setErrors(null);
      return null;

    }

  }


}
