import { HttpClientModule } from '@angular/common/http';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieUpdateComponent } from './components/movie-update/movie-update.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddActorComponent } from './components/add-actor/add-actor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PermissionComponent } from './components/permission/permission.component';


@NgModule({
  declarations: [
    AppComponent,
    AddMovieComponent,
    MovieDetailsComponent,
    MoviesListComponent,
    MovieUpdateComponent,
    AddActorComponent,
    LoginComponent,
    RegisterComponent,
    PermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: ['http://localhost:8080/api/'],
          sendAccessToken: true
      }
  })
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
