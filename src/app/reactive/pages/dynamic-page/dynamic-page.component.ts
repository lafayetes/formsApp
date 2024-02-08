import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name:['',Validators.required, Validators.minLength(3)],
    favoriteGames: this.fb.array([
        ['Darkest Dungeon',Validators.required],
        ['Detroit become human',Validators.required],
        ['Left 4 dead',Validators.required],
      ],
      )
  })



  constructor(private fb:FormBuilder){}

  get FavoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }


  onSubmit(){
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset();
  }
}
