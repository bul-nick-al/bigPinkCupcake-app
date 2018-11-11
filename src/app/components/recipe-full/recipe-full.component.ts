import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-recipe-full',
  templateUrl: './recipe-full.component.html',
  styleUrls: ['./recipe-full.component.css']
})
export class RecipeFullComponent {
  @Input()
  recipe: Recipe;
  @Output()
  backClick = new EventEmitter<void>();
  @Output()
  likeClick = new EventEmitter<number>();

  public onBackClick(): void {
    this.backClick.emit();
  }

  public onLikeClick(): any {
    this.likeClick.emit(this.recipe.id);
  }
}
