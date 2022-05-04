import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged = false;
  admin:boolean=false;

  constructor(private authService: AuthService,private router:Router) {

  }

  ngOnInit(): void {
    this.isLogged = this.authService.hasValidAccessToken();
    const roles = this.authService.getRoles();
    if (roles.includes("ROLE_ADMIN") || roles.includes("ROLE_MODERATOR")) {
      this.admin=true;
    }
  }

  title = 'MovieAngularApp';
  public isMenuCollapsed = true;

  public logout():void{
    this.authService.logout();
    window.location.reload();
  }

}
