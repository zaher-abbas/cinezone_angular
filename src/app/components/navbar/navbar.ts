import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';
import {Category} from '../../Interface/Category';
import {MoviesService} from '../../services/movies-service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  userName: string = '';
  email: string = '';
  categories!: Category[];
  router: Router = inject(Router);
  //Récuperation et affectation du signal currentUser from auth-service
  currentUser = inject(AuthService).currentUser;

  constructor(private authService: AuthService, private moviesService: MoviesService) {

  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName') ?? '';
    this.email = localStorage.getItem('email') ?? '';
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
}
