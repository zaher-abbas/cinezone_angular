import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Navbar} from '../navbar/navbar';


@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    Navbar
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username: string = '';
  email: string = '';
  password: string = '';
  router: Router = inject(Router);

  constructor(private authService: AuthService, private toastr: ToastrService) {
  }

  onSubmit() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.toastr.success('Registration successful');
      },
      error: (err) => console.log(err)
    });
  }
}
