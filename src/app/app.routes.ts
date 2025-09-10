import {Routes} from '@angular/router';
import {Home} from './components/home/home';
import {MoviesList} from './components/movies-list/movies-list';
import {Register} from './components/register/register';
import {Login} from './components/login/login';
import {Moviedetails} from './components/moviedetails/moviedetails';
import {Profile} from './components/profile/profile';
import {CategoryMovies} from './components/category-movies/category-movies.component';
import {MoviesForm} from './components/movies-form/movies-form';
import {authGuard} from './auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'movies',
    component: MoviesList
  },
  {
    path: 'movies/add',
    component: MoviesForm, canActivate: [authGuard]
  },
  {
    path: 'movies/:id/edit',
    component: MoviesForm, canActivate: [authGuard]
  },
  {
    path: 'movies/:id',
    component: Moviedetails
  },
  {
    path: 'categories/:id/movies',
    component: CategoryMovies
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile',
    component: Profile, canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home',

  }
];
