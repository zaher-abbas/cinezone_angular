import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth-service';

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
  router: Router = inject(Router);

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName') ?? '';
    this.email = localStorage.getItem('email') ?? '';
  }


  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('logout successful');
        localStorage.clear();
        this.router.navigate(['/home']);
      },
      error: (err) => console.log(err)
    })
  }
}
