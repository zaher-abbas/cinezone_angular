import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {MoviesService} from '../../services/movies-service';
import {Movie} from '../../Interface/Movie';
import {Category} from '../../Interface/Category';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movies-form',
  imports: [
    FormsModule,
    NgClass
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

  serverErrorMessage: string = '';
  currentYear = new Date().getFullYear();

  constructor(private moviesService: MoviesService, private toster: ToastrService) {
  }

  ngOnInit() {
    this.moviesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.log(err)
    })
  }

  onSubmit() {
    const movie: Movie = {
      title: this.title,
      director: this.director,
      rating: this.rating,
      release_year: this.release_year,
      category_id: this.category_id
    }
    this.moviesService.addMovie(movie).subscribe({
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
}
