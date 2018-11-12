import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import { Storage } from 'aws-amplify';
import { RecipeService } from '../../services/recipe.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public recipes: Recipe[] = [];
  public openedRecipe: Recipe;
  public ingredients: string[] = [];
  public favoriteOpenedRecipe: Recipe;
  public favoriteRecipes: Recipe[];

  public favoriteRecipeOpened = new BehaviorSubject(false);
  public recipeOpened = new BehaviorSubject(false);
  public searchChosen = new BehaviorSubject(true);
  public favoritesChosen = new BehaviorSubject(false);
  public settingsChosen = new BehaviorSubject(false);
  public audioRecord = new BehaviorSubject(false);

  constructor(private recipeService: RecipeService, private amplifyService: AmplifyService) {}

  ngOnInit() {}

  public openSearch(): void {
    this.searchChosen.next(true);
    this.favoritesChosen.next(false);
    this.settingsChosen.next(false);
  }

  public openFavorites(): void {
    this.getFavoriteRecipes();
    this.searchChosen.next(false);
    this.favoritesChosen.next(true);
    this.settingsChosen.next(false);
  }

  public openSettings(): void {
    this.searchChosen.next(false);
    this.favoritesChosen.next(false);
    this.settingsChosen.next(true);
  }

  public onCardClick(recipe: Recipe): void {
    window.scrollTo(0, 0);
    this.openedRecipe = recipe;
    this.recipeOpened.next(true);
  }

  public onFavoriteCardClick(recipe: Recipe): void {
    window.scrollTo(0, 0);
    this.favoriteOpenedRecipe = recipe;
    this.favoriteRecipeOpened.next(true);
  }

  public onClose(): void {
    window.scrollTo(0, 0);
    this.openedRecipe = null;
    this.recipeOpened.next(false);
  }

  public onFavoriteClose(): void {
    window.scrollTo(0, 0);
    this.favoriteOpenedRecipe = null;
    this.favoriteRecipeOpened.next(false);
  }

  public updateRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
  }

  public getFavoriteRecipes() {
    this.recipeService.getFavorites().subscribe(ids => {
      this.favoriteRecipes = [];
      this.recipeService.getRecipes(ids).subscribe(value => this.favoriteRecipes.push(value));
    });
  }

  public addToFavorites(recipeId: number) {
    this.recipeService.addToFavorites(recipeId);
  }

  public sendAudio() {
    this.audioRecord.next(true);
  }

  public startTransjob(file: File) {
    this.audioRecord.next(false);
    let text = '';
    const possible = 'bcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const fileName = `${text}.wav`;
    Storage.put(`audio/${fileName}`, file, { 'content-type': 'audio/wav', level: 'public' });
    setTimeout(
      () =>
        fromPromise(this.amplifyService.api().get('bigPinkCupcake', `/audio?fileUrl=${text}`, null)).pipe(
          map(response => response.body),
          debounceTime(70000),
          switchMap((id: string) =>
            this.amplifyService.api().get('bigPinkCupcake', `/audioanswer?jobName=${id}`, null)
          ),
          map(response => response.body),
          map(ingredients => (this.ingredients = ingredients))
        ),
      5000
    );
  }
}
