import {Component, inject} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, RouterLink} from '@angular/router';
import {MoviesService} from '../../services/movies-service';
import {Movie} from '../../Interface/Movie';
import {AuthService} from '../../services/auth-service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-moviedetails',
  imports: [
    RouterLink,
  ],
  templateUrl: './moviedetails.html',
  styleUrl: './moviedetails.css'
})
export class Moviedetails {

  movie!: Movie;
  id!: number;
  router: Router = inject(Router);

  currentUser = inject(AuthService).currentUser;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private toastr: ToastrService) {
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

  deleteMovie(id: number | undefined): void {
    if (confirm('🛈 Are you sure you want to delete this movie ?')) {
      this.moviesService.deleteMovie(id).subscribe({
        next: () => {
          console.log("deleted successfully");
          this.toastr.info("🛈 Movie deleted successfully");
          this.router.navigate(['/movies']);
        }
      })
    }
    return
  }

}





