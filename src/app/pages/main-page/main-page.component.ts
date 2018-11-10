import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public recipes: Recipe[] = [];
  public openedRecipe: Recipe;

  public recipeOpened = new BehaviorSubject(false);
  public searchChosen = new BehaviorSubject(true);
  public favoritesChosen = new BehaviorSubject(false);
  public settingsChosen = new BehaviorSubject(false);

  ngOnInit() {
    console.log(this.recipeOpened);
  }

  public openSearch(): void {
    this.searchChosen.next(true);
    this.favoritesChosen.next(false);
    this.settingsChosen.next(false);

  }

  public openFavorites(): void {
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

  public updateRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
  }
}
