import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import {AppComponent} from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SearchComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AmplifyAngularModule,
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export class PizzaPartyAppModule {}


