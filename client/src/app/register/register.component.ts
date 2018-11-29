import { TokenPayload, AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  register() {
    this.authenticationService.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.log(err);
    });
  }
}
