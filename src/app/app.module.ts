import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { RouterModule } from '@angular/router';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AppRoutingModule } from './app.routing';
import {AppComponent} from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainPageComponent } from './pages/main-page/main-page.component';


import {AuthService} from './services/auth.service';

import {ReactiveFormsModule} from '@angular/forms';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SearchComponent,
    ToolbarComponent,
    MainPageComponent,
    SearchComponent,
    RecipeCardComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    AmplifyAngularModule,
  ],
  providers: [AmplifyService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export class PizzaPartyAppModule {}


