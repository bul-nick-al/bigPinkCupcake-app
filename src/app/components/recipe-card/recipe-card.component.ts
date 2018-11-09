import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  public descriprion: string = 'These Mexican fritters are very common at fairs. In my border hometown, the line at this stand is always\n'+
    '      overwhelming. People wait hours in line just to get a taste of these churros. I have run across several recipes\n' +
    '      but this is the best one by far.';

  constructor() { }

  ngOnInit() {
  }

}
