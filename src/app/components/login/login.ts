import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email!: string;
  password!: string;
  router: Router = inject(Router);

  constructor(private authService: AuthService, private toastr: ToastrService) {
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastr.success('Login successful');
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            localStorage.setItem('userName', user.name);
            localStorage.setItem('email', user.email);
            this.router.navigate(['/movies']);
          },
          error: (err) => console.log(err)
        })
      },
      error: (err) => console.log(err)
    });
  }

}
