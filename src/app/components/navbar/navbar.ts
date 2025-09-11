import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {Category} from '../../Interface/Category';
import {MoviesService} from '../../services/movies-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  searchInput!: string;
  categories!: Category[];
  router: Router = inject(Router);
  //Récuperation et affectation du signal currentUser from auth-service
  currentUser = inject(AuthService).currentUser;

  constructor(private authService: AuthService, private moviesService: MoviesService) {

  }

  ngOnInit() {
    this.moviesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => console.log(err)
    })
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('logout successful');
        this.currentUser.set(null);
        this.router.navigate(['/home']);
      },
      error: (err) => console.log(err)
    })
  }

  onSearch(): void {
    this.router.navigate(['/movies'], {queryParams: {search: this.searchInput || null}});
  }
}
