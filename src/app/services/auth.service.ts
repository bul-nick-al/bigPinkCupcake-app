import { Injectable } from '@angular/core';
// import { AmplifyService } from 'aws-amplify-angular';
import { AmplifyService } from 'aws-amplify-angular';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {Observable} from 'rxjs';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signedIn: boolean;
  private user: any;

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        console.log(authState.state);
        this.signedIn = authState.state === 'signedIn';
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
        }
      });
  }

  public isSignedIn(): boolean {
    return this.signedIn;
  }

  public getUser(): boolean {
    return this.user;
  }

  public signIn(login: string, password: string): Observable<CognitoUser> {
    return fromPromise(this.amplifyService.auth().signIn(login, password));
  }
}
