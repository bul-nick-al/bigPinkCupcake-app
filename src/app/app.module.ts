import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import {AppComponent} from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchComponent } from './components/search/search.component';
import {AuthService} from './services/auth.service';
import {AuthenticatorComponent} from 'aws-amplify-angular/dist/src/components/authenticator/authenticator/authenticator.factory';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SearchComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AmplifyAngularModule,
  ],
  entryComponents: [AuthenticatorComponent],
  providers: [AmplifyService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export class PizzaPartyAppModule {}


