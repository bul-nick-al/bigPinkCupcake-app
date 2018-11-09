import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public recipeOpened = new BehaviorSubject(false);

  ngOnInit() {
    console.log(this.recipeOpened);
  }

  public onCardClick(): void {
    this.recipeOpened.next(true);
  }

  public onClose(): void {
    this.recipeOpened.next(false);
  }

}
