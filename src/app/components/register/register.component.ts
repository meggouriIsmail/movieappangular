import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    password: '',
  };
  constructor(
    private router: Router,
    private service: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.hasValidAccessToken()) {
      this.router.navigateByUrl('/movies');
    }
  }

  public save(): void {
    this.service.createUser(this.user).subscribe({
      next: () => this.router.navigateByUrl('login'),
      error: (err) => console.error(err),
    });
  }
}
