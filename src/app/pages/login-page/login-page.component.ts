import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public formGroup: FormGroup;

  constructor(private authService: AuthService,  private router: Router) {
    this.authService = authService;
    this.formGroup = new FormGroup({
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ngOnInit() {
  }

  onLoginClick() {
    this.authService.signIn(this.formGroup.get('login').value, this.formGroup.get('password').value)
      .subscribe(
        () => this.router.navigate(['index']),
        (error) => {
          console.log(error);
        }
      );
  }

  onLogoutClick() {
    this.authService.signOut();
  }

}
