import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { Observable } from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: CognitoUser;

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.user = null;
    this.amplifyService.authStateChange$.subscribe(authState => {
      if (authState.state === 'signedIn') {
        localStorage.setItem('isSignedIn', 'true');
      }
    });
  }

  public isSignedIn(): boolean {
    return !!localStorage.getItem('isSignedIn');
  }

  public getUser(): Observable<string> {
    return fromPromise(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      map(value => value.attributes.email)
    );
  }

  public signIn(login: string, password: string): Observable<CognitoUser> {
    console.log(login, password);
    return fromPromise(this.amplifyService.auth().signIn(login, password));
  }

  public signOut(): Observable<any> {
    localStorage.removeItem('isSignedIn');
    this.router.navigate(['login']);
    return fromPromise(this.amplifyService.auth().signOut());
  }

  public register(login, password, email): Observable<any> {
    return fromPromise(this.amplifyService.auth().signUp(login, password, email));
  }

  public confirm(login, code): Observable<any> {
    return fromPromise(this.amplifyService.auth().confirmSignUp(login, code));
  }
}
