import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.hasValidAccessToken()) {
      this.router.navigateByUrl("/movies");
    }
  }


  public login(): void {
    console.log(this.username);
    console.log(this.password);
    this.authService.login(this.username, this.password).then((resp) => {

      // Loading data about the user
      return this.authService.loadUserProfile();

    }).then(() => {

      console.log(this.authService.getRoles());
      window.location.reload();
    });
  }

}
