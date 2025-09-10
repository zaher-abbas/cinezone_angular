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
  readonly currentUser = inject(AuthService).currentUser;

  constructor(private authService: AuthService, private toastr: ToastrService) {
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastr.success('Login successful');

        //We call the getUserProfile to get the user information and assign then to currentUser signal which is injected in the navbar
        this.authService.getUserProfile().subscribe({
          next: (user) => {
            this.authService.setCurrentUser(user);
            this.router.navigate(['/home']);
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
