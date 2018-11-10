import { Injectable } from '@angular/core';
import {Recipe} from '../interfaces/recipe';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {forkJoin, Observable, of} from 'rxjs';
import {Storage} from 'aws-amplify';
import {map, switchMap} from 'rxjs/operators';
import {AmplifyService} from 'aws-amplify-angular';
import {HttpClient} from '@angular/common/http';
import {mergeMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private amplifyService: AmplifyService, private http: HttpClient) {
  }

  public getRecipe(id: string): Observable<Recipe> {
    return fromPromise(Storage.get(`recipes/${id}.json`, {level: 'public'}))
      .pipe(switchMap((link: string) => this.http.get<Recipe>(link, {})));
  }

  public searchByIngredients(ingredients: string[]): Observable<string[]> {
    if (ingredients.length === 0) {
      console.log('ret null');
      return of([]);
    } else {
      console.log('ret arr');
      return fromPromise(this.amplifyService.api()
        .get('bigPinkCupcake', `/get-recipes?ingredients=${ingredients.join()}`, null))
        .pipe(map(response => response.body));
    }
  }

  public search(ingredients: string[]): Observable<Recipe[]> {
    const idsObservable = this.searchByIngredients(ingredients);
    return forkJoin(idsObservable).pipe(mergeMap(id => this.getRecipe(id)));
  }
}
