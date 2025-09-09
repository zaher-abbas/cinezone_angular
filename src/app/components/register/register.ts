import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Navbar} from '../navbar/navbar';
import {HttpErrorResponse} from '@angular/common/http';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    Navbar,
    NgClass
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username: string = '';
  email: string = '';
  password: string = '';
  router: Router = inject(Router);
  errorMsg: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService) {
  }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastr.success('Registration successful');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMsg = err.error.message;
        this.toastr.error(this.errorMsg);
      }
    });
  }
}
