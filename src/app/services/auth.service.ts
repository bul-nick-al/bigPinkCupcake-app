import { Injectable } from '@angular/core';
// import { AmplifyService } from 'aws-amplify-angular';
import { AmplifyService } from 'aws-amplify-angular';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Observable} from 'rxjs';
import {CognitoUser} from 'amazon-cognito-identity-js';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: CognitoUser;

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.user = null;
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        if (authState.state === 'signedIn') {
          localStorage.setItem('isSignedIn', 'true');
        }
      });
  }

  public isSignedIn(): boolean {
    return !!localStorage.getItem('isSignedIn');
  }

  public getUser() {
    // this.amplifyService.auth().currentAuthenticatedUser().then(value => console.log(value))
    // // return this.user.getUserData();
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
}
