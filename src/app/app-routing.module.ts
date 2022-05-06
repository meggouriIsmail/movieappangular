import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddActorComponent } from './components/add-actor/add-actor.component';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieUpdateComponent } from './components/movie-update/movie-update.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { PermissionComponent } from './components/permission/permission.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './models/roles';


const routes: Routes = [
  {
    path: 'movies', component: MoviesListComponent, canActivate: [AuthGuard],
    // data: {
    //   userRoles: [Roles.ADMIN, Roles.MODERATOR,Roles.USER]
    // }
  },
  {
    path: 'add-movie', component: AddMovieComponent, canActivate: [AuthGuard],
    // data: {
    //   userRoles: [Roles.ADMIN, Roles.MODERATOR]
    // }
  },
  {
    path: 'movie-details/:movie_id', component: MovieDetailsComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [Roles.ADMIN, Roles.MODERATOR, Roles.USER]
    }
  },

  { path: 'add-actor/:movie_id', component: AddActorComponent, canActivate: [AuthGuard],
  data: {
    userRoles: [Roles.ADMIN, Roles.MODERATOR]
  } },
  { path: 'update-movie/:movie_id', component: MovieUpdateComponent, canActivate: [AuthGuard],
  data: {
    userRoles: [Roles.ADMIN, Roles.MODERATOR]
  } },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'nopermission', component: PermissionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
