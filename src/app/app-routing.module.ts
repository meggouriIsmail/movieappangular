import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';


const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'movie-details/:movie_id', component: MovieDetailsComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
