import {Component} from '@angular/core';
import {Movie} from '../../Interface/Movie';
import {MoviesService} from '../../services/movies-service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {catchError, debounceTime, distinctUntilChanged, map, of, switchMap} from 'rxjs';

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
  searchTxt!: string;
  loading: boolean = true;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map((q: ParamMap) => (q.get('search') ?? '').trim().toLowerCase()),
      debounceTime(200),           // optional: smooth out rapid changes
      distinctUntilChanged(),      // ensures switchMap runs only on actual changes
      switchMap(term => {
          if (term)
            this.searchTxt = term;
          return this.moviesService.getMovies()
        }
      ),
      catchError(err => {
        console.error(err);
        return of([]); // fail safe
      })
    )
      .subscribe({
        next: (movies) => {
          this.loading = false;
          this.movies = movies;
          if (this.searchTxt)
            this.movies = this.movies.filter(movie => movie.title.toLowerCase().includes(this.searchTxt));
          
        },
        error: (err) => {
          this.loading = false;
          console.error(err)
        }
      });
  }

}
