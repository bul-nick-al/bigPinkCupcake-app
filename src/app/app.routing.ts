import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {SearchComponent} from './components/search/search.component';
// import { ParcelsPageComponent } from './pages/parsels-page/parsels-page.component';
// import { AuthGuardService } from './guards/auth.guard';

const routes: Routes = [
  { path: 'index', component: LoginPageComponent },
  // { path: 'index', component: SearchComponent},
  // { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
