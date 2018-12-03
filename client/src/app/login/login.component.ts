import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  login() {
    this.authenticationService.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(err);
    });
  }
}
