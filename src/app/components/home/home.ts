import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Navbar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  username: string = '';

  ngOnInit() {
    this.username = localStorage.getItem('userName') ?? 'Guest';
  }

}
