import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from './components/footer/footer';
import {Navbar} from './components/navbar/navbar';
import {AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cinezone-angular');

  constructor(private authService: AuthService) {
  }

  //is called whenever the app is launched or refreshed in the browser or after the browser is closed then re-opened
  //Here we will call the getUserProfile function to re-get the connected user information for the navbar
  //Because the currentUser signal in authService is reset when refreshing/re-launching the app
  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (user) => this.authService.setCurrentUser(user),
      error: (err) => console.log(err)
    });
  }
}
