import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
        ['Darkest Dungeon',Validators.required],
        ['Detroit become human',Validators.required],
        ['Left 4 dead',Validators.required],
      ],
      )
  })

  public newFavorite:FormControl = new FormControl('',Validators.required);

  constructor(private fb:FormBuilder){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  isValidArrayField(formArray: FormArray,i:number): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }
  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {

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

  onAddToFavorite(){

    if(this.newFavorite.invalid)return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();

  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
