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

  ngOnInit() {
    console.log(this.recipeOpened);
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
