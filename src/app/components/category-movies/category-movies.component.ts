import {Component} from '@angular/core';
import {MoviesService} from '../../services/movies-service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Movie} from '../../Interface/Movie';

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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    });
    this.moviesService.getMoviesByCategory(this.id).subscribe({
      next: (movies) => {
        this.movies = movies
      },
      error: (err) => console.log(err)
    });
  }
}
