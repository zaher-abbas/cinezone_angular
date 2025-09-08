import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {MoviesService} from '../../services/movies-service';
import {Movie} from '../../Interface/Movie';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-moviedetails',
  imports: [
    RouterLink,
    Navbar
  ],
  templateUrl: './moviedetails.html',
  styleUrl: './moviedetails.css'
})
export class Moviedetails {

  movie!: Movie;
  id!: number;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    });
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movie) => {
        this.movie = movie
      },
      error: (err) => console.log(err)
    });

  }

}





