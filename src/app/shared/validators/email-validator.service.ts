import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator{


  validate(control: AbstractControl):  Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({email});

    const httpCallObservable = new Observable<ValidationErrors | null>((subscriber)=>{

      console.log({email});
      //Aqui basicamente simulariamos una respuesta de un servidor que por ejemplo tiene ocupado el correo lafayediego@gmail.com
      if(email === 'lafayediego@gmail.com'){
        subscriber.next({emailTaken:true});
        subscriber.complete();
      }
      //Esto es por si no ocurre el if quiere deecir que esta validacion es null y por ende la pasa
      subscriber.next(null);
      subscriber.complete();


    }).pipe(
      delay(3000)
    );
    return httpCallObservable;
  }




  // validate(control: AbstractControl):  Observable<ValidationErrors | null> {
  //   const email = control.value;
  //   console.log({email});

  //   return of({
  //     emailTaken: true

  //   }).pipe(
  //     delay(2000)
  //   )
  // }


}
