import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../interfaces/recipe';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-recipes-stack',
  templateUrl: './recipes-stack.component.html',
  styleUrls: ['./recipes-stack.component.css']
})
export class RecipesStackComponent implements OnInit {

  @Input()
  recipes: Recipe[];

  public recipeOpened = new BehaviorSubject(false);
  public openedRecipe: Recipe;

  constructor() { }

  public onCardClick(recipe: Recipe): void {
    window.scrollTo(0, 0);
    this.openedRecipe = recipe;
    this.recipeOpened.next(true);
  }

  ngOnInit() {
  }

}
