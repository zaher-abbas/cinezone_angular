import {Component} from '@angular/core';
import {AuthService} from '../../services/auth-service';
import {RouterLink} from '@angular/router';
import {User} from '../../Interface/User';

@Component({
  selector: 'app-profile',
  imports: [
    RouterLink,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  user!: User;

  constructor(private authService: AuthService) {
    this.authService.getUserProfile().subscribe({
      next: (user) => this.user = user,
      error: (err) => console.log(err)
    })
  }

}
