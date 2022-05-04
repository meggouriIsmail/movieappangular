import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Roles } from '../models/roles';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    console.log(this.getRouteRoles(route))
    return await this.checkRoles(this.getRouteRoles(route));
  }


  private getRouteRoles(route: ActivatedRouteSnapshot): Roles[] {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as Roles[];
    }
    return null;
  }


  private checkRoles(userRoles: Roles[]): boolean {
    if (this.authService.hasValidAccessToken()) {
      if (!userRoles) {
        return true;
      } else {
        if (this.authService.checkRoles(userRoles)) {
          return true;
        } else {
          this.router.navigateByUrl("nopermission");
          return false;
        }
      }

    } else {
      this.router.navigateByUrl("login");
      return false;
    }


  }


}
