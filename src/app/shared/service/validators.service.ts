import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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


}
