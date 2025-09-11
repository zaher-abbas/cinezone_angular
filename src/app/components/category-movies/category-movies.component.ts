import {Component} from '@angular/core';
import {MoviesService} from '../../services/movies-service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Movie} from '../../Interface/Movie';
import {distinctUntilChanged, map, switchMap} from 'rxjs';

@Component({
  selector: 'app-category-movies',
  imports: [
    RouterLink
  ],
  templateUrl: './category-movies.component.html',
  styleUrl: './category-movies.component.css'
})
export class CategoryMovies {

  id!: number;
  movies!: Movie[];

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => Number(params.get('id'))),
        distinctUntilChanged(), // only refetch when id actually changes
        switchMap((id: number) => this.moviesService.getMoviesByCategory(id))
      ).subscribe({
      next: (movies) => (this.movies = movies),
      error: (err) => console.error(err)
    });
  }
}

//- The component is reused (Angular uses the same Component instance) when navigating between different ids...
// - switchMap ensures a new API call is made whenever the id changes.
// - distinctUntilChanged prevents redundant reloads if you click the same category again.
