import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

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

  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorsService
    ){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }


  isValidField(field: string): boolean | null {
   return this.validatorsService.isValidField(this.myForm,field);
  }


  getFieldError(field: string): string | null {
    return this.validatorsService.getFieldError(this.myForm,field);
  }
  isValidArrayField(formArray: FormArray,i:number): boolean | null {
    return this.validatorsService.isValidArrayField(formArray,i)
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
