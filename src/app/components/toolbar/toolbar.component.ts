import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  @Output()
  searchClick = new EventEmitter<void>();
  @Output()
  favoritesClick = new EventEmitter<void>();
  @Output()
  settingsClick = new EventEmitter<void>();

  ngOnInit() {
  }

  public onSearchClick(): void {
    this.searchClick.emit();
  }

  public onFavoritesClick(): void {
    this.favoritesClick.emit();
  }

  public onSettingsClick(): void {
    this.settingsClick.emit();
  }

}
