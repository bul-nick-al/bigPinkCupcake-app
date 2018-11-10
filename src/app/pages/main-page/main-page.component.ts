import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {BehaviorSubject, noop} from 'rxjs';
import { Recipe } from '../../interfaces/recipe';
import {PredictIngredientService} from '../../services/predict-ingredient.service';
import {debounceTime} from 'rxjs/internal/operators';
import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';
import {tap} from 'rxjs/operators';

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

  constructor(
    private recipeService: RecipeService) {}

  ngOnInit() {
  }

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
    this.recipeService.getFavorites().subscribe(ids =>{
      this.favoriteRecipes = [];
      this.recipeService.getRecipes(ids).subscribe(
        value =>
          this.favoriteRecipes.push(value)
      );
    });
  }

}
