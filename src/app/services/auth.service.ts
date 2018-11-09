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
  public user: CognitoUser;

  constructor(private amplifyService: AmplifyService) {
    this.user = null;
    this.amplifyService.authStateChange$
      .subscribe(authState => {
        if (!authState.user) {
          this.user = null;
        } else {
          this.user = authState.user;
        }
      });
  }

  public isSignedIn(): boolean {
    return !(this.user === null);
  }

  public getUser(): CognitoUser {
    return this.user;
  }

  public signIn(login: string, password: string): Observable<CognitoUser> {
    return fromPromise(this.amplifyService.auth().signIn(login, password));
  }

  public signOut(): Observable<any> {
    return fromPromise(this.amplifyService.auth().signOut());
  }
}
