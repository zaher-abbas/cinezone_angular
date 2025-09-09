import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Navbar} from '../navbar/navbar';
import {HttpErrorResponse} from '@angular/common/http';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    NgClass
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email!: string;
  password!: string;
  router: Router = inject(Router);
  errorMsg: string = '';

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
          error: (err: HttpErrorResponse) => console.log(err)
        })
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        this.toastr.error(this.errorMsg);
      }
    });
  }

}
