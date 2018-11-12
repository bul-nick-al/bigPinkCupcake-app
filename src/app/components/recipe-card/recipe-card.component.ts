import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  @Input()
  recipe: Recipe;
  @Output()
  likeClick = new EventEmitter<Recipe>();
  @Output()
  cardClick = new EventEmitter<void>();

  public onLikeClick(): any {
    this.likeClick.emit(this.recipe);
  }

  public onClick(): void {
    this.cardClick.emit();
  }
}
