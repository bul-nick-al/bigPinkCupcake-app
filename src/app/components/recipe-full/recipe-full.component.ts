import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-recipe-full',
  templateUrl: './recipe-full.component.html',
  styleUrls: ['./recipe-full.component.css']
})
export class RecipeFullComponent implements OnInit {

  @Input()
  peremennaya;
  @Output()
  backClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
  }

  public onBackClick(): void {
    this.backClick.emit();
  }

}
