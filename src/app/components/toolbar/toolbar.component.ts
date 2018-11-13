import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {EmailService} from '../../services/email.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  @Input()
  public searchChosen: BehaviorSubject<boolean>;
  @Input()
  public favoritesChosen: BehaviorSubject<boolean>;
  @Input()
  public settingsChosen: BehaviorSubject<boolean>;

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
    // this.auth.saveConfig(false, true);
    this.auth.getConfig().subscribe(value => console.log(value), error1 => console.log(error1));
    this.settingsClick.emit();
  }

}
