import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators';
import { PredictIngredientService } from '../../services/predict-ingredient.service';
import { RecipeService } from '../../services/recipe.service';
import {Recipe} from '../../interfaces/recipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  recipes: Recipe[] = [];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  filteredIngredientsArray: string[];
  ingredients: string[] = [];
  allIngredients: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('ingredientInput')
  ingredientInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  constructor(private predictIngredientService: PredictIngredientService, private recipeService: RecipeService) {
    this.ingredientCtrl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(
        (ingredient: string) =>
          (this.filteredIngredients = predictIngredientService
            .predictIngredient(ingredient)
            .pipe(tap(value => (this.filteredIngredientsArray = value))))
      );
  }

  add(event: MatChipInputEvent): void {
    // Add ingredient only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.filteredIngredientsArray.includes(event.value)) {
      return;
    }
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our ingredient
      if ((value || '').trim()) {
        this.ingredients.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }
      this.ingredientCtrl.setValue(null);
      }
      this.updateRecipesIds();
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      this.updateRecipesIds();
    }
  }

  public updateRecipesIds(): void {
    this.recipes = [];
    this.recipeService.searchByIngredients(this.ingredients)
      .subscribe(ids => this.recipeService.search(ids).subscribe(value => {
        this.recipes.push(value);
        console.warn(this.recipes);
      }));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingredientInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

}

