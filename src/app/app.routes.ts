import {Routes} from '@angular/router';
import {Home} from './components/home/home';
import {MoviesList} from './components/movies-list/movies-list';
import {Register} from './components/register/register';
import {Login} from './components/login/login';
import {Moviedetails} from './components/moviedetails/moviedetails';
import {Profile} from './components/profile/profile';
import {Category} from './components/category/category';

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
    path: 'movies/:id',
    component: Moviedetails
  },
  {
    path: 'categories/:id/movies',
    component: Category
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
    component: Profile,
  },
  {
    path: '**',
    redirectTo: '/home',

  }
];
