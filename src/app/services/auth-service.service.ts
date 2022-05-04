import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authConfig: AuthConfig = {
    issuer: 'http://102.53.15.134:8085/auth/realms/movie_application',
    redirectUri: window.location.origin + "/movies",
    clientId: 'spring_backend_client',
    dummyClientSecret: 'O54zX61jI3w6gb7ChLRyVIvYLYsPNS3y',
    scope: 'openid',
    responseType: 'code',
    requireHttps: false,
    disableAtHashCheck: true,
    showDebugInformation: true,
    sessionChecksEnabled: true
  }

  constructor(private oauthService: OAuthService,
    private router: Router
  ) {
    this.configure();
  }


  /**
 * Configures the Angular OpenID Connect client
 */
  private configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oauthService.loadUserProfile();
    }).catch(err => console.error("you need to sign in"));
  }
  /**
    * Will kick-off the OpenID Connect Authorization Code flow (Based on the configured authConfig#issuer)
    */
  public login(username: string, password: string): Promise<TokenResponse> {
    //this.oauthService.initLoginFlow();
    this.oauthService.oidc = false;

    return this.oauthService.fetchTokenUsingPasswordFlow(username, password);
  }

  public hasValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public loadUserProfile(): Promise<object> {
    return this.oauthService.loadUserProfile();
  }
  public getRoles(): string[] {
    const accessToken: string = this.oauthService?.getAccessToken();
    const tokens: string[] = accessToken?.split('.');
    const claims = tokens ? JSON.parse(atob(tokens[1])):null;
    return claims?.realm_access.roles;
  }

  public checkRoles(userRoles: Roles[]): boolean {
    for (const role of userRoles) {
      for (const allow of this.getRoles()) {

        if (role.toLowerCase() === allow.toLowerCase()) {
          return true;
        }
      }
    }

    return false;
  }

  public getClientId(): string {
    const claims = this.getJwtAsObject();
    //return claims['azp'];
    return claims['azp'];
  }
  public getIssuer(): string {
    const claims = this.getJwtAsObject();
    return claims['iss'];
  }
  public logout(): void {
    this.oauthService.logOut(true);
  }
  private getJwtAsObject(): object {
    const accessToken: string = this.oauthService.getAccessToken();
    const tokens: string[] = accessToken.split('.');
    return JSON.parse(atob(tokens[1]));
  }


}
