import {Component} from '@angular/core';
import {Movie} from '../../Interface/Movie';
import {MoviesService} from '../../services/movies-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movies-list',
  imports: [
    RouterLink,
  ],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css'
})
export class MoviesList {

  movies!: Movie[];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.moviesService.getMovies().subscribe({
      next: (movies) => this.movies = movies,
      error: (err) => console.log(err)
    });
  }

}
