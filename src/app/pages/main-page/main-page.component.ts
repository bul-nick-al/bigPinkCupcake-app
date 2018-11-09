import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  public recipeOpened = false;

  ngOnInit() {
  }

  public onCardClick(): void {
    console.warn('sosiska');
    this.recipeOpened = true;
  }

  public onClose(): void {
    this.recipeOpened = false;
  }

}
