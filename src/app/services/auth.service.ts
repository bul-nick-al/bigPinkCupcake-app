import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import {Observable, of} from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Config } from '../interfaces/config';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: CognitoUser;

  constructor(private amplifyService: AmplifyService, private router: Router, private http: HttpClient) {
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

  public getUserMore(): Observable<any> {
    return fromPromise(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      map(value => ({email: value.attributes.email, name: value.username}))
    );
  }

  public getUser(): Observable<string> {
    return fromPromise(this.amplifyService.auth().currentAuthenticatedUser()).pipe(
      map(value => value.attributes.email)
    );
  }

  public signIn(login: string, password: string): Observable<CognitoUser> {
    if (this.isLocal()) {
      localStorage.setItem('isSignedIn', 'true');

      return of(null);
    }

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

  public saveConfig(isSubscribed: boolean, sendEmail: boolean) {
    this.amplifyService.storage().put('config.json', `{"isSubscribed": ${isSubscribed}, "sendEmail": ${sendEmail}}`, {level: 'private'})
      .then(value => console.warn(value), error1 => console.warn(error1));
  }

  public getConfig(): Observable<any> {
    return fromPromise(this.amplifyService.storage().get('config.json',  {level: 'private'})).pipe(
      switchMap((link: string) => this.http.get<Config>(link, {}))
    );
  }

  private isLocal(): boolean {
    return !environment.production;
  }
}
