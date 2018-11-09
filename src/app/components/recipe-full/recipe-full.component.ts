import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-recipe-full',
  templateUrl: './recipe-full.component.html',
  styleUrls: ['./recipe-full.component.css']
})
export class RecipeFullComponent implements OnInit {

  @Input()
  public peremennaya;

  constructor() {
  }

  ngOnInit() {
  }

  public onBackClick(): void {
    console.warn('im back');
    this.peremennaya();
  }

}
