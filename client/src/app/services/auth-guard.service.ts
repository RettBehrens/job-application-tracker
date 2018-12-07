// angular imports
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// service imports
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate() {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
