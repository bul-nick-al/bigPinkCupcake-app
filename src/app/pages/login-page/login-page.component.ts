import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public formGroup: FormGroup;
  public signUpClicked = new BehaviorSubject(false);
  public registerButtonShown = new BehaviorSubject(false);
  public signInOpened = new BehaviorSubject(true);
  public confirmationFieldShown = new BehaviorSubject(false);

  constructor(private authService: AuthService, private router: Router) {
    this.authService = authService;
    this.formGroup = new FormGroup({
      login: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      confirmationCode: new FormControl('')
    });
  }

  ngOnInit() {
    this.checkIfAuthenticated();
  }

  onLoginClick() {
    this.authService.signIn(this.formGroup.get('login').value, this.formGroup.get('password').value).subscribe(
      () => this.router.navigate(['index']),
      error => {
        console.log(error);
      }
    );
  }

  onSignUpClick() {
    this.authService.register(
      this.formGroup.get('login').value,
      this.formGroup.get('password').value,
      this.formGroup.get('email').value
    );
    this.confirmationFieldShown.next(true);
    this.registerButtonShown.next(false);
  }

  onConfirmClick() {
    this.authService.confirm(this.formGroup.get('login').value, this.formGroup.get('confirmationCode').value);
    this.signInOpened.next(true);
    this.signUpClicked.next(false);
  }

  private checkIfAuthenticated(): void {
    if (this.authService.isSignedIn()) {
      this.router.navigate(['index']);
    }
  }

  public onLinkClick() {
    this.signInOpened.next(false);
    this.signUpClicked.next(true);
    this.registerButtonShown.next(true);
  }
}
