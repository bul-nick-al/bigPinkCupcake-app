import { Injectable } from '@angular/core';
import AWS from '@aws-amplify/core';
import {AmplifyService} from 'aws-amplify-angular';
import {switchMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private amplifyService: AmplifyService, private auth: AuthService) {}

  sendEmail(imageUrl: string, recipeName: string) {
    this.auth
      .getUserMore()
      .pipe(
        switchMap((user) => {
          console.log(user.name, user.email);
          return this.amplifyService
            .api()
            .get('bigPinkCupcake',
              `/send-email?name=${user.name}&recipe_name=${recipeName}&email=${user.email}&image_url=${imageUrl}`, null); }
        )
      )
      .subscribe(value => console.warn(value), error1 => console.warn(error1));
  }
}
