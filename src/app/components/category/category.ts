import {Component} from '@angular/core';
import {MoviesService} from '../../services/movies-service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Movie} from '../../Interface/Movie';
import {DatePipe} from '@angular/common';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-category',
  imports: [
    DatePipe,
    Navbar,
    RouterLink
  ],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {

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
