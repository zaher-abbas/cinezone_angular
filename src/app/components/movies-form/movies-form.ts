import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {MoviesService} from '../../services/movies-service';
import {Movie} from '../../Interface/Movie';
import {Category} from '../../Interface/Category';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, ParamMap, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-movies-form',
  imports: [
    FormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './movies-form.html',
  styleUrl: './movies-form.css'
})
export class MoviesForm {

  title!: string;
  director!: string;
  release_year!: number;
  rating!: number;
  category_id!: number;

  categories!: Category[];

  router: Router = inject(Router);
  id!: number;
  newMovie!: Movie;

  serverErrorMessage: string = '';
  currentYear = new Date().getFullYear();

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private toster: ToastrService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'));
    });
    if (this.id) {
      this.moviesService.getMovieDetails(this.id).subscribe({
        next: (movie) => {
          this.title = movie.title;
          this.director = movie.director;
          this.release_year = movie.release_year;
          this.rating = movie.rating;
          this.category_id = movie.category_id;
        },
      })
    }
    this.moviesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.log(err)
    })
  }

  onSubmit() {
    this.newMovie = {
      title: this.title,
      director: this.director,
      rating: this.rating,
      release_year: this.release_year,
      category_id: this.category_id
    }
    if (this.id) {
      this.editMovie();
    } else {
      this.addMovie();
    }

  }

  addMovie() {
    this.moviesService.addMovie(this.newMovie).subscribe({
      next: () => {
        console.log('Movie added successfully');
        this.toster.success('Movie added successfully');
        this.router.navigate(['/movies']);

      },
      error: (err: HttpErrorResponse) => {
        this.serverErrorMessage = err.error.message;
      }
    })
  }

  editMovie() {
    this.moviesService.editMovie(this.id, this.newMovie).subscribe({
      next: () => {
        console.log('Movie Edited successfully');
        this.toster.success('Movie Edited successfully');
        this.router.navigate(['/movies']);

      },
      error: (err: HttpErrorResponse) => {
        this.serverErrorMessage = err.error.message;
      }
    })
  }
}
