import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActorComponent } from './components/add-actor/add-actor.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieUpdateComponent } from './components/movie-update/movie-update.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';


const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'movie-details/:movie_id', component: MovieDetailsComponent },
  { path: 'update-movie/:movie_id', component: MovieUpdateComponent },
  { path: 'add-actor/:movie_id', component: AddActorComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
