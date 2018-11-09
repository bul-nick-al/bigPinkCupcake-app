import { Injectable } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {fromObservable} from 'rxjs/internal/observable/fromObservable';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {map, tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class PredictIngredientService {

  constructor(private amplifyService: AmplifyService) { }

  public predictIngredient(beginningString: string) {
    return fromPromise(this.amplifyService.api()
      .get('bigPinkCupcake', `/get-ingredient-by-prefix?ingredient_prefix=${beginningString}`, null))
      .pipe(map(response => response.body));
  }
}
