import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      emailCheckbox: new FormControl(''),
      subscriptionCheckBox: new FormControl('')
    });
    // this.formGroup.setValue()
    this.authService.getConfig().subscribe(config => {
      this.formGroup.patchValue({'emailCheckbox': config.sendEmail}, {emitEvent: false});
      this.formGroup.patchValue({'subscriptionCheckBox': config.isSubscribed}, {emitEvent: false});
    });
    this.formGroup.valueChanges.subscribe(value => this.onCheck());
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.signOut();
  }

  onCheck() {
    this.authService.saveConfig(this.formGroup.get('subscriptionCheckBox').value, this.formGroup.get('emailCheckbox').value);
  }
}
