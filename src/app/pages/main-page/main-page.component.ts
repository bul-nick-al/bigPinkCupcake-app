import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewChecked {

  constructor(private cdRef: ChangeDetectorRef) { }

  public recipeOpened = new BehaviorSubject(false);

  ngOnInit() {
    console.log(this.recipeOpened);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  public onCardClick(): void {
    this.recipeOpened.next(true);
  }

  public onClose(): void {
    this.recipeOpened.next(false);
  }

}
