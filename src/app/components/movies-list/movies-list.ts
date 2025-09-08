import {Component, inject} from '@angular/core';
import {Movie} from '../../Interface/Movie';
import {MoviesService} from '../../services/movies-service';
import {DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-movies-list',
  imports: [
    DatePipe,
    RouterLink,
    Navbar
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css'
})
export class MoviesList {

  movies!: Movie[];
  route: Router = inject(Router);

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe({
      next: (movies) => this.movies = movies,
      error: (err) => console.log(err)
    });
  }

}
