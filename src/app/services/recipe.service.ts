import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { forkJoin, from, Observable, of } from 'rxjs';
import { Storage } from 'aws-amplify';
import { map, switchMap } from 'rxjs/operators';
import { AmplifyService } from 'aws-amplify-angular';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, mergeMap } from 'rxjs/internal/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private amplifyService: AmplifyService, private http: HttpClient, private auth: AuthService) {}

  public getRecipe(id: string): Observable<Recipe> {
    return fromPromise(Storage.get(`recipes/${id}.json`, { level: 'public' })).pipe(
      switchMap((link: string) => this.http.get<Recipe>(link, {}))
    );
  }

  public getFavorites(): Observable<string[]> {
    return this.auth.getUser().pipe(
      switchMap((email: string) =>
        this.amplifyService.api().get('bigPinkCupcake', `/get-favourites?user_email=${email}`, null)
      ),
      map(response => response.body)
    );
  }

  public searchByIngredients(ingredients: string[]): Observable<string[]> {
    if (ingredients.length === 0) {
      return of([]).pipe(delay(1000));
    } else {
      return fromPromise(
        this.amplifyService.api().get('bigPinkCupcake', `/get-recipes?ingredients=${ingredients.join()}`, null)
      ).pipe(map(response => response.body));
    }
  }

  public getRecipes(ingredientsIds: string[]) {
    return from(ingredientsIds).pipe(mergeMap(id => this.getRecipe(id)));
  }

  public addToFavorites(recipeId: number) {
    this.auth
      .getUser()
      .pipe(
        switchMap((email: string) =>
          this.amplifyService
            .api()
            .get('bigPinkCupcake', `/add-to-favorites?user_email=${email}&recipe_id=${recipeId}`, null)
        )
      )
      .subscribe(value => console.warn(value), error1 => console.warn(error1));
  }
}
