import { Injectable } from '@angular/core';
import {AmplifyService} from 'aws-amplify-angular';
import {fromObservable} from 'rxjs/internal/observable/fromObservable';
import Amplify, { Storage } from 'aws-amplify';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {map, switchMap, tap} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class PredictIngredientService {

  constructor(private amplifyService: AmplifyService, private http: HttpClient) { }

  public predictIngredient(beginningString: string) {
    return fromPromise(this.amplifyService.api()
      .get('bigPinkCupcake', `/get-ingredient-by-prefix?ingredient_prefix=${beginningString}`, null))
      .pipe(map(response => response.body));
  }

  public getJSON(): Observable<Recipe> {
    return fromPromise(Storage.get('recipes/1.json', {level: 'public'}))
      .pipe(switchMap((link: string) => this.http.get<Recipe>(link, {})));
  }
}
